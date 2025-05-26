import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { controlarCambiosGuard } from './controlar-cambios.guard';

describe('controlarCambiosGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => controlarCambiosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
