import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetrepstockestComponent } from './detrepstockest.component';

describe('DetrepstockestComponent', () => {
  let component: DetrepstockestComponent;
  let fixture: ComponentFixture<DetrepstockestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetrepstockestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetrepstockestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
