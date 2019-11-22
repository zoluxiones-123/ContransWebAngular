import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripComponent } from './suscrip.component';

describe('SuscripComponent', () => {
  let component: SuscripComponent;
  let fixture: ComponentFixture<SuscripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuscripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
