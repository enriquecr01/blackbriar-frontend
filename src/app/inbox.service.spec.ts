import { TestBed } from '@angular/core/testing';

import { InboxService } from './inbox.service';

describe('InboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InboxService = TestBed.get(InboxService);
    expect(service).toBeTruthy();
  });
});
