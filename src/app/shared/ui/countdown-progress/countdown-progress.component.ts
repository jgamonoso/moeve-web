import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-countdown-progress',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './countdown-progress.component.html',
  styleUrls: ['./countdown-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownProgressComponent {
  /** 0..100 */
  @Input({ required: true }) percent = 0;
  /** minutos restantes */
  @Input({ required: true }) minutes = 0;
  @Input() titleKey = 'hud.remaining_time';

  // Si usas <circle>: radio/centro y trazo
  @Input() cx = 30;
  @Input() cy = 30;
  @Input() r  = 24;         // antes 22
  @Input() strokeWidth = 7; // aro un pelín más grueso

    // elimina computed()
    circumference(): number {
        return 2 * Math.PI * this.r;
    }

    dashOffset(): number {
        const c = this.circumference();
        const p = Math.max(0, Math.min(100, this.percent));
        return c * (1 - p / 100);
    }

    minStr(): string {
        const m = Math.max(0, Math.trunc(this.minutes || 0));
        const h = Math.floor(m / 60);
        const mm = m % 60;
        return h > 0 ? `${h}:${mm.toString().padStart(2, '0')}` : `${mm}`;
    }
    timeStr(): string {
        // Preferimos seconds si viene; si no, usamos minutes*60
        const total = Number.isFinite(this.minutes*60) && this.minutes*60 > 0
            ? Math.max(0, Math.trunc(this.minutes*60))
            : Math.max(0, Math.trunc((this.minutes || 0) * 60));

        const mm = Math.floor(total / 60);
        const ss = total % 60;
        return `${mm}:${ss.toString().padStart(2, '0')}`;
    }
}
