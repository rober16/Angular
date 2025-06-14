import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { actividadesResolver } from './actividades.resolver';

describe('actividadesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => actividadesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
