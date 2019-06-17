import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumUiComponent } from './forum-ui.component';

describe('ForumUiComponent', () => {
  let component: ForumUiComponent;
  let fixture: ComponentFixture<ForumUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
