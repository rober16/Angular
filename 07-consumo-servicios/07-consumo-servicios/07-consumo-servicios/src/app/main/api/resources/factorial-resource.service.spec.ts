import { TestBed } from '@angular/core/testing';

import { FactorialResourceService } from './factorial-resource.service';

describe('FactorialResourceService', () => {
  let service: FactorialResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactorialResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
