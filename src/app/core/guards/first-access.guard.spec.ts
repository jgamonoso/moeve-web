import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { firstAccessGuard } from './first-access.guard';

describe('firstAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => firstAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
