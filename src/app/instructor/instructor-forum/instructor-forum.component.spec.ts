import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorForumComponent } from './instructor-forum.component';

describe('InstructorForumComponent', () => {
  let component: InstructorForumComponent;
  let fixture: ComponentFixture<InstructorForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
