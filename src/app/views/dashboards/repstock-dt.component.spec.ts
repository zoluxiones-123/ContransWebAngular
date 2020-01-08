import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepstockDTComponent } from './repstock-dt.component';

describe('RepstockDTComponent', () => {
  let component: RepstockDTComponent;
  let fixture: ComponentFixture<RepstockDTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepstockDTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepstockDTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
