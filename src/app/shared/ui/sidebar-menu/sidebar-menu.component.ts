import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface SidebarItem {
  id: string;
  title: string;
  icon?: string;         // nombre de icono o emoji temporal
  done?: boolean;        // punto verde/azul según estado
  disabled?: boolean;
}

const STORAGE_KEY = 'sidebar.collapsed';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
  /** Estado visual (puede ser controlado desde fuera con [(collapsed)]) */
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

  ngOnInit() {
    // Restaurar estado si existe
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      this.collapsed = saved === '1';
      this.collapsedChange.emit(this.collapsed);
    }
  }

  onItemClick(it: SidebarItem) {
    if (!it.disabled) this.itemClick.emit(it);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    localStorage.setItem(STORAGE_KEY, this.collapsed ? '1' : '0');
    this.collapsedChange.emit(this.collapsed);
  }
}
