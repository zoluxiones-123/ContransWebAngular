import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasolservComponent } from './consultasolserv.component';

describe('ConsultasolservComponent', () => {
  let component: ConsultasolservComponent;
  let fixture: ComponentFixture<ConsultasolservComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultasolservComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasolservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
