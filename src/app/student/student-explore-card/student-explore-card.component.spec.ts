import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExploreCardComponent } from './student-explore-card.component';

describe('StudentExploreCardComponent', () => {
  let component: StudentExploreCardComponent;
  let fixture: ComponentFixture<StudentExploreCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExploreCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExploreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
