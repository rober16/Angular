import { TestBed } from '@angular/core/testing';

import { SucursalesResourceService } from './sucursales-resource.service';

describe('SucursalesResourceService', () => {
  let service: SucursalesResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SucursalesResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
