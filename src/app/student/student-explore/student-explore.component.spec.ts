import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExploreComponent } from './student-explore.component';

describe('StudentExploreComponent', () => {
  let component: StudentExploreComponent;
  let fixture: ComponentFixture<StudentExploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExploreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
