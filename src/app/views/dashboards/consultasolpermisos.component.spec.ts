import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasolpermisosComponent } from './consultasolpermisos.component';

describe('ConsultasolpermisosComponent', () => {
  let component: ConsultasolpermisosComponent;
  let fixture: ComponentFixture<ConsultasolpermisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultasolpermisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasolpermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
