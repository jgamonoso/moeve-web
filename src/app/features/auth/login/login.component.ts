import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalFlagsService } from '../../../core/services/flags/local-flags.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private flags = inject(LocalFlagsService);

  submitting = signal(false);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);

    // ⚠️ Simulación: aceptamos cualquier user/pass
    const uid = this.f.username.value!.trim() || 'guest';
    this.flags.userId = uid;
    this.flags.onboardingDone = false;

    // pequeño “delay” para animación del botón
    setTimeout(() => {
      this.router.navigateByUrl('/loading');
    }, 450);
  }
}
