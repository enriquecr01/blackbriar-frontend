import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerGroupComponent } from './banner-group.component';

describe('BannerGroupComponent', () => {
  let component: BannerGroupComponent;
  let fixture: ComponentFixture<BannerGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
