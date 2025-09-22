import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';

interface StationItem {
  id: string;
  title: string;
  percent: number;
}

@Component({
  selector: 'app-landscape',
  standalone: true,
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.scss'],
})
export class LandscapeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidebar', { static: true }) sidebarRef!: ElementRef<HTMLElement>;
  @ViewChild('badgeBar', { static: true })
  badgeBarRef!: ElementRef<HTMLElement>;
  @ViewChild('statusBar', { static: true })
  statusBarRef!: ElementRef<HTMLElement>;
  @ViewChild('quick', { static: true }) quickRef!: ElementRef<HTMLElement>;

  private router = inject(Router);
  private zone = inject(NgZone);
  private gsapCtx?: gsap.Context;

  // 🔧 Mock temporal. Cuando tengas el GET /context/progress sustitúyelo.
  progress = {
    molecules: { value: 1, total: 5 },
    percent: 28,
    remainingMinutes: 65,
  };

  stations: StationItem[] = [
    { id: 'welcome', title: 'Bienvenida', percent: 100 },
    { id: 'company', title: 'Conócenos', percent: 40 },
    { id: 'culture', title: 'Cultura & Valores', percent: 0 },
    { id: 'it', title: 'IT & Accesos', percent: 0 },
    { id: 'training', title: 'Formación (LMS)', percent: 0 },
  ];

  lang = 'es';

  ngAfterViewInit(): void {
    // Las animaciones mejor fuera de Angular para no disparar change detection.
    this.zone.runOutsideAngular(() => {
      this.gsapCtx = gsap.context(() => {
        const sidebar = this.sidebarRef.nativeElement;
        const badge = this.badgeBarRef.nativeElement;
        const status = this.statusBarRef.nativeElement;
        const quick = this.quickRef.nativeElement;

        const tl = gsap.timeline({
          defaults: { duration: 3.0, ease: 'power3.out' },
        });
        tl.from(sidebar, { x: -40, autoAlpha: 0 }, 0.0);
        tl.from(badge, { y: -40, autoAlpha: 0 }, 0.1);
        tl.from(status, { y: -40, autoAlpha: 0 }, 0.18);
        tl.from(quick, { x: 40, autoAlpha: 0 }, 0.18);
      });
    });
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }

  // 💡 Helpers de UI
  formatMinutes(mins: number): string {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h && m) return `${h} h ${m} min`;
    if (h) return `${h} h`;
    return `${m} min`;
  }

  // 🔗 Navegación / acciones (stubs)
  openStation(id: string) {
    // Más adelante: animación de zoom → carga modal/route con la estación
    this.router.navigateByUrl(`/station/${id}`);
  }
  openChecklist() {
    /* abre modal o route /checklist */
  }
  openSupport() {
    /* abre modal o route /support */
  }
  cycleLang() {
    this.lang = this.lang === 'es' ? 'en' : 'es';
  }
  logout() {
    /* limpia storage, redirige login */
  }
  goHome() {
    this.router.navigateByUrl('/landscape');
  }
}
