import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AutoTooltipDirective } from '../auto-tooltip.directive';

export interface SidebarItem {
  id: string;
  titleKey: string;  // clave i18n: p.e. 'menu.welcome'
  icon: string;      // nombre de Material Icon (ligature), p.e. 'waving_hand'
  disabled?: boolean;
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule, AutoTooltipDirective],
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
  /** Estado visual (lo controla el padre con [collapsed] y (collapsedChange)) */
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  /** Contenido dinámico (mapa de estaciones o secciones) */
  @Input({ required: true }) items: SidebarItem[] = [];

  /** Idioma seleccionado (ES/EN, etc.) */
  @Input() lang = 'ES';

  /** Callbacks hacia el contenedor (Landscape) */
  @Output() itemClick = new EventEmitter<SidebarItem>();
  @Output() langClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  /** Logo abre home, lo exponemos por si se quiere manejar */
  @Output() brandClick = new EventEmitter<void>();

  onItemClick(it: SidebarItem) {
    console.log('sidebar-menu.component - onItemClick - it:', it)
    if (!it.disabled) this.itemClick.emit(it);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
}
