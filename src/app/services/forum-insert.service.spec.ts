import { TestBed } from '@angular/core/testing';

import { ForumInsertService } from './forum-insert.service';

describe('ForumInsertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForumInsertService = TestBed.get(ForumInsertService);
    expect(service).toBeTruthy();
  });
});
