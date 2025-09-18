import { TestBed } from '@angular/core/testing';

import { LocalFlagsService } from './local-flags.service';

describe('LocalFlagsService', () => {
  let service: LocalFlagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalFlagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
