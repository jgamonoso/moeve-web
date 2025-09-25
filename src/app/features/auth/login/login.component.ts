import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalFlagsService } from '../../../core/services/flags/local-flags.service';
import { AuthService } from '../../../core/services/auth.service';

type DemoUser = {
  id: 'empleado1' | 'empleado2';
  label: string;
  dataset: 'user1' | 'user2'; // dataset usado por los mocks
};

const DEMO_USERS: DemoUser[] = [
  { id: 'empleado1', label: 'Empleado 1', dataset: 'user1' },
  { id: 'empleado2', label: 'Empleado 2', dataset: 'user2' },
];

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
  private auth = inject(AuthService);

  submitting = signal(false);
  users = DEMO_USERS;

  form = this.fb.group({
    userId: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);

    const selected = this.users.find(u => u.id === this.f.userId.value)!;

    // --- Fuente de verdad de identidad/dataset ---
    this.auth.loginDemo(selected.dataset); // aquí fijamos user1/user2

    // Tu flujo actual iba a /loading; perfecto. Si prefieres ir directo al landscape, cambia ruta.
    setTimeout(() => {
      this.router.navigateByUrl('/loading');
    }, 450);
  }
}