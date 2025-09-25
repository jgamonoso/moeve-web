import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationModule } from '../../models/station.models';

@Component({
  selector: 'app-station-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './station-sidebar.component.html',
  styleUrls: ['./station-sidebar.component.scss']
})
export class StationSidebarComponent {
  @Input() title = '';
  @Input({ required: true }) modules: StationModule[] = [];
  @Input() activeIndex = 0;
  @Output() selectIndex = new EventEmitter<number>();

  select(i: number) { this.selectIndex.emit(i); }
}
