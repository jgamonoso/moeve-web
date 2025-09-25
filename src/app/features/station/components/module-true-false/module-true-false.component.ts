import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationModuleTrueFalse } from '../../models/station.models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-module-true-false',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './module-true-false.component.html',
  styleUrl: './module-true-false.component.scss'
})
export class ModuleTrueFalseComponent {
  @Input({ required: true }) module!: StationModuleTrueFalse;
}
