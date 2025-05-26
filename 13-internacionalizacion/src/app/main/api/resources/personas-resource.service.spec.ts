import { TestBed } from '@angular/core/testing';

import { PersonasResourceService } from './personas-resource.service';

describe('PersonasResourceService', () => {
  let service: PersonasResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
