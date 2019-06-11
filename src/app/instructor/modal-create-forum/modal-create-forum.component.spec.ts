import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateForumComponent } from './modal-create-forum.component';

describe('ModalCreateForumComponent', () => {
  let component: ModalCreateForumComponent;
  let fixture: ComponentFixture<ModalCreateForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
