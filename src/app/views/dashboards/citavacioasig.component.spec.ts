import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitavacioasigComponent } from './citavacioasig.component';

describe('CitavacioasigComponent', () => {
  let component: CitavacioasigComponent;
  let fixture: ComponentFixture<CitavacioasigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitavacioasigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitavacioasigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
