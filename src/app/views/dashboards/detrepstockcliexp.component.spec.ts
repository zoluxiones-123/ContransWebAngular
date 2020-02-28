import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetrepstockcliexpComponent } from './detrepstockcliexp.component';

describe('DetrepstockcliexpComponent', () => {
  let component: DetrepstockcliexpComponent;
  let fixture: ComponentFixture<DetrepstockcliexpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetrepstockcliexpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetrepstockcliexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
