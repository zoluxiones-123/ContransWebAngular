import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepstockrealComponent } from './repstockreal.component';

describe('RepstockrealComponent', () => {
  let component: RepstockrealComponent;
  let fixture: ComponentFixture<RepstockrealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepstockrealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepstockrealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
