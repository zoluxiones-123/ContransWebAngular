import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepstockexpComponent } from './repstockexp.component';

describe('RepstockexpComponent', () => {
  let component: RepstockexpComponent;
  let fixture: ComponentFixture<RepstockexpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepstockexpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepstockexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
