import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepstockfinalComponent } from './repstockfinal.component';

describe('RepstockfinalComponent', () => {
  let component: RepstockfinalComponent;
  let fixture: ComponentFixture<RepstockfinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepstockfinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepstockfinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
