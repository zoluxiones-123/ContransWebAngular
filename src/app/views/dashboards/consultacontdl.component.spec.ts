import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultacontdlComponent } from './consultacontdl.component';

describe('ConsultacontdlComponent', () => {
  let component: ConsultacontdlComponent;
  let fixture: ComponentFixture<ConsultacontdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultacontdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultacontdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
