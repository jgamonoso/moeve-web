import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(value: unknown): string {
    if (typeof value !== 'number' || !Number.isFinite(value)) return '';

    const m = Math.max(0, Math.trunc(value));
    const h = Math.floor(m / 60);
    const mm = m % 60;

    return h > 0 ? `${h}:${mm.toString().padStart(2, '0')}` : `${mm}`;
  }
}
