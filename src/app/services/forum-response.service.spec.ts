import { TestBed } from '@angular/core/testing';

import { ForumResponseService } from './forum-response.service';

describe('ForumResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForumResponseService = TestBed.get(ForumResponseService);
    expect(service).toBeTruthy();
  });
});
