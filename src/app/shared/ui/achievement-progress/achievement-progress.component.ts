import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-achievement-progress',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './achievement-progress.component.html',
  styleUrls: ['./achievement-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementProgressComponent {
  @Input() value = 0;
  @Input() total = 0;
  @Input() labelKey = 'hud.molecules_reached';

  /** Geometría del “rail” (coincide con tu path) */
  @Input() barX = 36;
  @Input() barY = 84.9376;
  @Input() barWidth = 320;
  @Input() barHeight = 30.1244;

  /** % y ancho recortado — como getters (reactan a @Input) */
  get percent(): number {
    const t = Math.max(0, this.total || 0);
    if (t === 0) return 0;
    const p = (this.value / t) * 100;
    return Math.max(0, Math.min(100, Math.round(p)));
  }
  get clipWidth(): number {
    return (this.barWidth * this.percent) / 100;
  }

  /** Radios para el cap redondeado del relleno */
  get barRx(): number { return this.barHeight / 2; }
  get barRy(): number { return this.barHeight / 2; }
}
