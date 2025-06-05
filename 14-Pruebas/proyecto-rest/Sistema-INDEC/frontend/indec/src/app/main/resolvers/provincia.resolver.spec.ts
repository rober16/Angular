import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { provinciaResolver } from './provincia.resolver';

describe('provinciaResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => provinciaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
