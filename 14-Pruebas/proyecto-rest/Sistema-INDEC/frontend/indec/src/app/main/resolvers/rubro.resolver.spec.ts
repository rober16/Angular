import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { rubroResolver } from './rubro.resolver';

describe('rubroResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => rubroResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
