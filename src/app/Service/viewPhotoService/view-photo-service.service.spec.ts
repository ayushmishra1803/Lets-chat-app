import { TestBed } from '@angular/core/testing';

import { ViewPhotoServiceService } from './view-photo-service.service';

describe('ViewPhotoServiceService', () => {
  let service: ViewPhotoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewPhotoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
