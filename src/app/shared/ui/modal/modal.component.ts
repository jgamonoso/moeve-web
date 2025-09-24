import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { PrefsService } from '../../../core/services/prefs.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

type ModalKind = 'language' | 'onboarding';
export interface ModalData {
  type: ModalKind;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    TranslateModule,
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  // language
  lang = signal<'es' | 'en'>('es');

  // onboarding
  step = signal(0);

  readonly data = inject<ModalData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  private readonly prefs = inject(PrefsService);
  private readonly i18n = inject(TranslateService);

  ngOnInit(): void {
    const current = this.prefs.lang || 'es';
    this.lang.set(current);
    this.i18n.use(current);
  }

  // ---- Language ----
  confirmLang() {
    const v = this.lang();
    this.prefs.lang = v;
    this.i18n.use(v);
    this.dialogRef.close({ langChanged: true, lang: v });
  }

  // ---- Onboarding ----
  next() {
    this.step.update((v) => Math.min(2, v + 1));
  }
  prev() {
    this.step.update((v) => Math.max(0, v - 1));
  }
  skip() {
    this.prefs.onboardingDone = true;
    this.dialogRef.close({ onboarding: true, skipped: true });
  }
  finish() {
    this.prefs.onboardingDone = true;
    this.dialogRef.close({ onboarding: true, skipped: false });
  }
}
