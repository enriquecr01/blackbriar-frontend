import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumResponseComponent } from './forum-response.component';

describe('ForumResponseComponent', () => {
  let component: ForumResponseComponent;
  let fixture: ComponentFixture<ForumResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForumResponseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
