import { TestBed } from '@angular/core/testing';

import { StorageResourceService } from './storage-resource.service';

describe('StorageResourceService', () => {
  let service: StorageResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
