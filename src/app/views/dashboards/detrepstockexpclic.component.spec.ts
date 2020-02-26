import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetrepstockExpCliComponent } from './detrepstockexpclic.component';

describe('DetrepstockExpComponent', () => {
  let component: DetrepstockExpCliComponent;
  let fixture: ComponentFixture<DetrepstockExpCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetrepstockExpCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetrepstockExpCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
