import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { StationData, StationModule } from '../models/station.models';

// Módulos de estación
import { ModuleScrollComponent } from '../components/module-scroll/module-scroll.component';
import { ModuleRevealComponent } from '../components/module-reveal/module-reveal.component';
import { ModuleQuizComponent } from '../components/module-quiz/module-quiz.component';
import { ModuleTrueFalseComponent } from '../components/module-true-false/module-true-false.component';

@Component({
  selector: 'app-station-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    ModuleScrollComponent,
    ModuleRevealComponent,
    ModuleQuizComponent,
    ModuleTrueFalseComponent
  ],
  templateUrl: './station-modal.component.html',
  styleUrls: ['./station-modal.component.scss'],
})
export class StationModalComponent {
  public data = inject<StationData>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<StationModalComponent>);

  /** índice del módulo activo (0..n-1) */
  selectedIndex = signal(0);

  /** lista de módulos de la estación (segura) */
  modules = computed(() => this.data?.modules ?? []);

  /** módulo actual o null si el índice no es válido */
  current = computed<StationModule | null>(() => {
    const list = this.modules();
    const i = this.selectedIndex();
    return i >= 0 && i < list.length ? list[i] : null;
    // nota: en plantilla usamos $any(mod) para evitar choques de tipos
  });

  /** progreso simple: % basado en el índice seleccionado */
  progressPct = computed(() => {
    const list = this.modules();
    return list.length ? Math.round(((this.selectedIndex() + 1) / list.length) * 100) : 0;
  });

  /** cambiar de módulo y resetear el scroll del panel derecho */
  onSelectModule(i: number) {
    const list = this.modules();
    if (i >= 0 && i < list.length) {
      this.selectedIndex.set(i);
      queueMicrotask(() => {
        document.querySelector('.station__content')
          ?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      });
    }
  }

  /** cerrar modal */
  close() {
    this.dialogRef.close();
  }
}
