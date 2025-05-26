import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { equiposResolver } from './equipos.resolver';

describe('equiposResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => equiposResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
