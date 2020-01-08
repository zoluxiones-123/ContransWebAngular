import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepstockDAComponent } from './repstock-da.component';

describe('RepstockDAComponent', () => {
  let component: RepstockDAComponent;
  let fixture: ComponentFixture<RepstockDAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepstockDAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepstockDAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
