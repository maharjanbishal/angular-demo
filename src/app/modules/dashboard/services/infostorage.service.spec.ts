import { TestBed } from '@angular/core/testing';

import { InfostorageService } from './infostorage.service';

describe('InfostorageService', () => {
  let service: InfostorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfostorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
