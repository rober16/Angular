import { TestBed } from '@angular/core/testing';

import { ProductosResourceService } from './productos-resource.service';

describe('ProductosResourceService', () => {
  let service: ProductosResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
