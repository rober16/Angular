import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { generosResolver } from './generos.resolver';

describe('generosResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => generosResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
