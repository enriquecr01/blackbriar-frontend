import { TestBed } from '@angular/core/testing';

import { ForumStudentsService } from './forum-students.service';

describe('ForumStudentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForumStudentsService = TestBed.get(ForumStudentsService);
    expect(service).toBeTruthy();
  });
});
