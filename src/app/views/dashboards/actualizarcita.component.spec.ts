import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarcitaComponent } from './actualizarcita.component';

describe('ActualizarcitaComponent', () => {
  let component: ActualizarcitaComponent;
  let fixture: ComponentFixture<ActualizarcitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarcitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarcitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
