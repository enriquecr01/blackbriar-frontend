import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumResponseFeedbackComponent } from './forum-response-feedback.component';

describe('ForumResponseFeedbackComponent', () => {
  let component: ForumResponseFeedbackComponent;
  let fixture: ComponentFixture<ForumResponseFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumResponseFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumResponseFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
