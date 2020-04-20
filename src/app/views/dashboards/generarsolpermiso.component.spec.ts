import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarsolpermisoComponent } from './generarsolpermiso.component';

describe('GenerarsolpermisoComponent', () => {
  let component: GenerarsolpermisoComponent;
  let fixture: ComponentFixture<GenerarsolpermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarsolpermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarsolpermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
