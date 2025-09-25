import { Component, Input } from '@angular/core';
import { StationModuleScroll } from '../../models/station.models';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module-scroll',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './module-scroll.component.html',
  styleUrl: './module-scroll.component.scss'
})
export class ModuleScrollComponent {
  @Input({ required: true }) module!: StationModuleScroll;
}
