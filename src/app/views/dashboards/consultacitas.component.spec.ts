import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultacitasComponent } from './consultacitas.component';

describe('ConsultacitasComponent', () => {
  let component: ConsultacitasComponent;
  let fixture: ComponentFixture<ConsultacitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultacitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultacitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
