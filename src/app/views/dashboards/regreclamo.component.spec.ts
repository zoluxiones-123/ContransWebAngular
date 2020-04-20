import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegreclamoComponent } from './regreclamo.component';

describe('RegreclamoComponent', () => {
  let component: RegreclamoComponent;
  let fixture: ComponentFixture<RegreclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegreclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegreclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
