import { TestBed } from '@angular/core/testing';

import { CarritoResourceService } from './carrito-resource.service';

describe('CarritoResourceService', () => {
  let service: CarritoResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
