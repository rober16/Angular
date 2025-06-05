import { TestBed } from '@angular/core/testing';

import { ResultadosResourceService } from './resultados-resource.service';

describe('ResultadosResourceService', () => {
  let service: ResultadosResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadosResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
