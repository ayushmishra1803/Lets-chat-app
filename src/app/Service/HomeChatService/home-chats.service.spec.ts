import { TestBed } from '@angular/core/testing';

import { HomeChatsService } from './home-chats.service';

describe('HomeChatsService', () => {
  let service: HomeChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
