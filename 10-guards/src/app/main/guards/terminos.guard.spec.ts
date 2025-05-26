import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { terminosGuard } from './terminos.guard';

describe('terminosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => terminosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
