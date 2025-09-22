import { Injectable } from '@angular/core';
import { AuthUser, DemoDataset } from '../../core/models/user.model';

const AUTH_KEY = 'authUser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getCurrentUser(): AuthUser | null {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }

  loginDemo(dataset: DemoDataset) {
    const user: AuthUser = {
      id: dataset,                  // usa el propio dataset como id
      displayName: dataset === 'user1' ? 'Empleado 1' : 'Empleado 2',
      dataset,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(AUTH_KEY);
  }
}
