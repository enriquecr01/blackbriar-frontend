import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorForumDisplayComponent } from './instructor-forum-display.component';

describe('InstructorForumDisplayComponent', () => {
  let component: InstructorForumDisplayComponent;
  let fixture: ComponentFixture<InstructorForumDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorForumDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorForumDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
