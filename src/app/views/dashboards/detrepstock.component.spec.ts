import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetrepstockComponent } from './detrepstock.component';

describe('DetrepstockComponent', () => {
  let component: DetrepstockComponent;
  let fixture: ComponentFixture<DetrepstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetrepstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetrepstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
