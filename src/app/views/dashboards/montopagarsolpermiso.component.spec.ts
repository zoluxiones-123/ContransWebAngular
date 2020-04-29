import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontopagarsolpermisoComponent } from './montopagarsolpermiso.component';

describe('MontopagarsolpermisoComponent', () => {
  let component: MontopagarsolpermisoComponent;
  let fixture: ComponentFixture<MontopagarsolpermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontopagarsolpermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontopagarsolpermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
