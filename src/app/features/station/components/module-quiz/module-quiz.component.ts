import { Component, Input } from '@angular/core';
import { StationModuleQuiz } from '../../models/station.models';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module-quiz',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './module-quiz.component.html',
  styleUrl: './module-quiz.component.scss'
})
export class ModuleQuizComponent {
  @Input({ required: true }) module!: StationModuleQuiz;

}
