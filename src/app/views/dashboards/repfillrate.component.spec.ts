import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepfillrateComponent } from './repfillrate.component';

describe('RepfillrateComponent', () => {
  let component: RepfillrateComponent;
  let fixture: ComponentFixture<RepfillrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepfillrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepfillrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
