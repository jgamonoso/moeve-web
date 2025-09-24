import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
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
export class HopeMomentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoIntro', { static: true })
  videoIntroRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('introSection', { static: true })
  introSectionRef!: ElementRef<HTMLElement>;

  @ViewChild('videoScrub', { static: true })
  videoScrubRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('scrubSection', { static: true })
  scrubSectionRef!: ElementRef<HTMLElement>;

  scrubReady = false;
  scrubSrc = 'assets/videos/hope-moment2-1280-910.mp4'; // valor por defecto
  private st?: ScrollTrigger;
  private cleanupFns: (() => void)[] = [];
  private router = inject(Router);
  private zone = inject(NgZone);

  ngOnInit(): void {
    // Elegimos vídeo en función del ancho de ventana
    this.scrubSrc = this.pickScrubSrc();
  }

  ngAfterViewInit(): void {
    const videoIntro = this.videoIntroRef.nativeElement;

    // Intento 1: reproducir con audio (algunos navegadores lo permitirán)
    videoIntro.muted = false;
    videoIntro.currentTime = 0;
    videoIntro.play().catch(() => {
      // Si el navegador bloquea autoplay con audio, reproducimos muted (sin botón)
      videoIntro.muted = true;
      videoIntro.play().catch(() => {
        // Último recurso: si esto fallara es que el navegador exige interacción
        // pero normalmente autoplay muted funciona.
      });
    });

    // Si el usuario interactúa (click/tecla/touch) mientras dura el vídeo 1,
    // intentamos reactivar audio en caliente sin mostrar botones.
    const tryEnableAudio = () => {
      if (!videoIntro.ended) {
        videoIntro.muted = false;
        videoIntro.volume = 1;
        videoIntro.play().catch(() => {
          // Si aún no deja, lo dejamos muted; no molestamos más.
        });
      }
    };
    const events = ['pointerdown', 'keydown', 'touchstart'];
    events.forEach((ev) =>
      window.addEventListener(ev, tryEnableAudio, { passive: true }),
    );
    this.cleanupFns.push(() =>
      events.forEach((ev) => window.removeEventListener(ev, tryEnableAudio)),
    );

    // Al terminar el vídeo 1 -> pasamos al scrub
    const onEnded = () => {
      this.enableScrubSection();
      this.scrubSectionRef.nativeElement.scrollIntoView({
        behavior: 'instant' as ScrollBehavior,
      });
    };
    videoIntro.addEventListener('ended', onEnded);
    this.cleanupFns.push(() =>
      videoIntro.removeEventListener('ended', onEnded),
    );
  }

  private pickScrubSrc(): string {
    const w = window.innerWidth;
    // Si el ancho es igual o mayor que 1518, usamos el 1920x1080; si no, el 1280x910
    return w >= 1518
      ? 'assets/videos/hope-moment2-1920-1080.mp4'
      : 'assets/videos/hope-moment2-1280-910.mp4';
  }

  private enableScrubSection() {
    this.scrubReady = true;

    this.zone.runOutsideAngular(() => {
      const video = this.videoScrubRef.nativeElement as HTMLVideoElement & {
        fastSeek?: (t: number) => void;
      };
      const section = this.scrubSectionRef.nativeElement;

      const setup = () => {
        try {
          video.pause();
        } catch {
          /* noop */
        }
        video.muted = true;

        const duration = Math.max(0.1, video.duration || 0.1);
        const fps = 30; // tras tu re-encode
        const eps = 1 / fps; // ~un frame a 30 fps
        const totalFrames = Math.round(duration * fps);
        // “16 px por frame” suele dar scroll largo y suave; ajusta entre 12–20 según sensaciones:
        const scrollDistance = totalFrames * 12;
        console.log('scrollDistance:', scrollDistance);

        // Primado para Safari/iOS (mejora seeks)
        const prime = () =>
          video
            .play()
            .then(() => video.pause())
            .catch(() => {
              /* noop */
            });

        // Función de sync con fastSeek si existe
        const setTime = (t: number) => {
          // Clamp por seguridad
          const target = Math.max(0, Math.min(duration - eps, t));
          if (typeof video.fastSeek === 'function') {
            video.fastSeek(target);
          } else {
            video.currentTime = target;
          }
        };

        // Creamos el ScrollTrigger controlado
        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const t = self.progress * (duration - eps);
            setTime(t);
          },
          onLeave: () => {
            this.zone.run(() => this.router.navigateByUrl('/landscape'));
          },
        });

        this.st = st;

        // Prime después de tener metadata
        prime();
      };

      if (video.readyState >= 1) setup();
      else video.addEventListener('loadedmetadata', setup, { once: true });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', onResize);
      this.cleanupFns.push(() =>
        window.removeEventListener('resize', onResize),
      );
      this.cleanupFns.push(() => this.st?.kill());
    });
  }

  skip() {
    this.router.navigateByUrl('/landscape');
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach((fn) => fn());
  }
}
