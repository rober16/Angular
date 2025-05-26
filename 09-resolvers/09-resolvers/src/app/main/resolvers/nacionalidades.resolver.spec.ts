import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { nacionalidadesResolver } from './nacionalidades.resolver';

describe('nacionalidadesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => nacionalidadesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
