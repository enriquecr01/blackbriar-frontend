import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGroupForumsComponent } from './student-group-forums.component';

describe('StudentGroupForumsComponent', () => {
  let component: StudentGroupForumsComponent;
  let fixture: ComponentFixture<StudentGroupForumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGroupForumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGroupForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
