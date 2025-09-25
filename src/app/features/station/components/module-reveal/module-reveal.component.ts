import { Component, Input } from '@angular/core';
import { StationModuleReveal } from '../../models/station.models';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module-reveal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './module-reveal.component.html',
  styleUrl: './module-reveal.component.scss'
})
export class ModuleRevealComponent {
  @Input({ required: true }) module!: StationModuleReveal;

}
