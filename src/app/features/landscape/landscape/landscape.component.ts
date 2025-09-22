import {
  AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, inject
} from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { PrefsService } from '../../../core/services/prefs.service';
import { MockDataService } from '../../../core/services/mock-data.service';
import { ProgressContext, StationSummary } from '../../../core/models/progress.model';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landscape',
  standalone: true,
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.scss'],
  imports: [CommonModule, TranslateModule],
})
export class LandscapeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidebar', { static: true }) sidebarRef!: ElementRef<HTMLElement>;
  @ViewChild('badgeBar', { static: true }) badgeBarRef!: ElementRef<HTMLElement>;
  @ViewChild('statusBar', { static: true }) statusBarRef!: ElementRef<HTMLElement>;
  @ViewChild('quick', { static: true }) quickRef!: ElementRef<HTMLElement>;

  private router = inject(Router);
  private zone = inject(NgZone);
  private gsapCtx?: gsap.Context;

  private dialog = inject(MatDialog);
  private prefs = inject(PrefsService);
  private mock = inject(MockDataService);

  // Estado con valor por defecto para evitar "undefined"
  progress: ProgressContext = {
    molecules: { value: 0, total: 0 },
    percent: 0,
    remainingMinutes: 0,
    stations: []
  };
  stations: StationSummary[] = [];
  lang = this.prefs.lang; // 'es' por defecto si no hay nada

  private i18n = inject(TranslateService); // 👈 inyecta el servicio

  constructor() {
    // Aplica el idioma almacenado (si existe) al cargar el componente
    const current = this.prefs.lang || 'es';
    this.i18n.use(current);
  }

  ngOnInit(): void {
    this.loadProgress();
  }

  private loadProgress() {
    this.mock.getProgressForCurrentUser().subscribe({
      next: (ctx) => {
        this.progress = ctx;
        this.stations = ctx.stations || [];
      },
      error: () => {
        // fallback visual mínimo si falla la carga
        this.progress = { molecules: { value: 0, total: 5 }, percent: 0, remainingMinutes: 0, stations: [] };
        this.stations = [];
      }
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.gsapCtx = gsap.context(() => {
        const sidebar = this.sidebarRef.nativeElement;
        const badge   = this.badgeBarRef.nativeElement;
        const status  = this.statusBarRef.nativeElement;
        const quick   = this.quickRef.nativeElement;

        const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' }});
        tl.from(sidebar, { x: -40, autoAlpha: 0 }, 0.0);
        tl.from(badge,   { y: -40, autoAlpha: 0 }, 0.1);
        tl.from(status,  { y: -40, autoAlpha: 0 }, 0.18);
        tl.from(quick,   { x:  40, autoAlpha: 0 }, 0.18);

        tl.add(() => {
          this.zone.run(() => this.maybeOpenModals());
        });
      });
    });
  }

  private async maybeOpenModals() {
    // 1) Selección de idioma si hace falta
    if (!localStorage.getItem('lang')) {
      const ref = this.dialog.open(ModalComponent, {
        data: { type: 'language' },
        disableClose: true,
        panelClass: 'moeve-dialog',
      });
      await ref.afterClosed().toPromise();
      this.lang = this.prefs.lang;
    }

    // 2) Onboarding si no está hecho
    if (!this.prefs.onboardingDone) {
      await this.dialog.open(ModalComponent, {
        data: { type: 'onboarding' },
        disableClose: true,
        panelClass: 'moeve-dialog',
      }).afterClosed().toPromise();
    }
  }

  // ---- Helpers usados en la plantilla
  formatMinutes(mins: number | undefined | null): string {
    const m = Math.max(0, Math.trunc(mins ?? 0));
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return h > 0 ? `${h}h ${mm}m` : `${mm}m`;
  }

  // === Acciones UI ===

  openLangModal() {
    console.log('openLangModal clicked');
    const ref = this.dialog.open(ModalComponent, {
      data: { type: 'language' },
      disableClose: false,
      panelClass: 'moeve-dialog',
    });
    ref.afterClosed().subscribe(res => {
      if (res?.langChanged) this.lang = this.prefs.lang;
    });
  }

  // ---- Acciones referenciadas por la vista (stubs por ahora)
  openSupport() {
    // TODO: abrir FAQ
    console.log('openSupport clicked');
  }
  openChecklist() {
    // TODO: implementar o navegar a checklist
    console.log('openChecklist clicked');
  }

  openStation(station: StationSummary) {
    // TODO: implementar navegación a detalle
    console.log('openStation', station);
  }

  logout() {
    this.prefs.clearAll();
    this.router.navigateByUrl('/login');
  }

  goHome() { this.router.navigateByUrl('/landscape'); }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }
}
