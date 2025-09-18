import {
  AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, inject,
} from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hope-moment',
  standalone: true,
  templateUrl: './hope-moment.component.html',
  styleUrls: ['./hope-moment.component.scss'],
})
export class HopeMomentComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video',   { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('section', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  private st?: ScrollTrigger;
  private router = inject(Router);
  private zone = inject(NgZone);

  ngAfterViewInit(): void {
    // Todo GSAP fuera de Angular para no disparar change detection
    this.zone.runOutsideAngular(() => {
      const video = this.videoRef.nativeElement;
      const section = this.sectionRef.nativeElement;

      const setup = () => {
        const duration = Math.max(0.1, video.duration || 0.1);

        // Asegúrate de que el vídeo está pausado (no queremos reproducción automática)
        try { video.pause(); } catch {}

        // Distancia de scroll que “recorrerá” el vídeo (ajusta a tu gusto)
        const scrollDistance = 3000;

        const tween = gsap.fromTo(
          video,
          { currentTime: 0 },
          {
            currentTime: duration - 0.05, // evita clavar justo al final
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${scrollDistance}`,
              scrub: true,   // el tiempo del vídeo sigue el scroll
              pin: true,     // mantiene la sección fija mientras hacemos scroll
              anticipatePin: 1,
              onLeave: () => {
                // Al terminar el scrub, navega al siguiente paso
                this.zone.run(() => this.router.navigateByUrl('/landscape'));
              },
            }
          }
        );

        this.st = tween.scrollTrigger!;
      };

      // Si ya hay metadatos, montamos ya; si no, esperamos
      if (video.readyState >= 1) setup();
      else video.addEventListener('loadedmetadata', setup, { once: true });

      // Si se redimensiona la ventana, refrescamos ScrollTrigger
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', onResize);

      // Limpieza al destruir
      this.cleanup = () => {
        window.removeEventListener('resize', onResize);
        this.st?.kill();
      };
    });
  }

  private cleanup?: () => void;

  ngOnDestroy(): void {
    this.cleanup?.();
  }

  // Botón “Saltar”
  skip() {
    // Opcional: podrías marcar un flag de “hope visto” en localStorage
    this.router.navigateByUrl('/landscape');
  }
}
