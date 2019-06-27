import { TestBed } from '@angular/core/testing';

import { UserUnsubscribeGroupService } from './user-unsubscribe-group.service';

describe('UserUnsubscribeGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserUnsubscribeGroupService = TestBed.get(UserUnsubscribeGroupService);
    expect(service).toBeTruthy();
  });
});
