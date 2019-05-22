import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMygroupsCardComponent } from './student-mygroups-card.component';

describe('StudentMygroupsCardComponent', () => {
  let component: StudentMygroupsCardComponent;
  let fixture: ComponentFixture<StudentMygroupsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMygroupsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMygroupsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
