import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorGroupComponent } from './instructor-group.component';

describe('InstructorGroupComponent', () => {
  let component: InstructorGroupComponent;
  let fixture: ComponentFixture<InstructorGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
