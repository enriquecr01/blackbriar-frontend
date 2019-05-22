import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMygroupsComponent } from './student-mygroups.component';

describe('StudentMygroupsComponent', () => {
  let component: StudentMygroupsComponent;
  let fixture: ComponentFixture<StudentMygroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMygroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMygroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
