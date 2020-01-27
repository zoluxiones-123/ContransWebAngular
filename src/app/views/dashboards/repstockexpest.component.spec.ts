import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepstockexpestComponent } from './repstockexpest.component';

describe('RepstockexpestComponent', () => {
  let component: RepstockexpestComponent;
  let fixture: ComponentFixture<RepstockexpestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepstockexpestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepstockexpestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
