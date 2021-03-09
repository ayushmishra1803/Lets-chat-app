import { TestBed } from '@angular/core/testing';

import { UsersDatafromFirebaseService } from './users-datafrom-firebase.service';

describe('UsersDatafromFirebaseService', () => {
  let service: UsersDatafromFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersDatafromFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
