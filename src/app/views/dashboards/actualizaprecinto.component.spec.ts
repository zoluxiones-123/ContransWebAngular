import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaprecintoComponent } from './actualizaprecinto.component';

describe('ActualizaprecintoComponent', () => {
  let component: ActualizaprecintoComponent;
  let fixture: ComponentFixture<ActualizaprecintoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizaprecintoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaprecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
