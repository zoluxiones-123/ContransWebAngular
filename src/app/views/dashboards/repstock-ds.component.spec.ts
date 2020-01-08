import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepstockDSComponent } from './repstock-ds.component';

describe('RepstockDSComponent', () => {
  let component: RepstockDSComponent;
  let fixture: ComponentFixture<RepstockDSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepstockDSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepstockDSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
