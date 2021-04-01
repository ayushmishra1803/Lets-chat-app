import { TestBed } from '@angular/core/testing';

import { EditUserDataService } from './edit-user-data.service';

describe('EditUserDataService', () => {
  let service: EditUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
