import { TestBed } from '@angular/core/testing';

import { BusquedaResourceService } from './busqueda-resource.service';

describe('BusquedaResourceService', () => {
  let service: BusquedaResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
