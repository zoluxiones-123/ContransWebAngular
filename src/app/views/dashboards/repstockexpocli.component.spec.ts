import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepstockexpocliComponent } from './repstockexpocli.component';

describe('RepstockexpocliComponent', () => {
  let component: RepstockexpocliComponent;
  let fixture: ComponentFixture<RepstockexpocliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepstockexpocliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepstockexpocliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
