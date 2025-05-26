import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { personasResolver } from './personas.resolver';

describe('personasResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => personasResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
