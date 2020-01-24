import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepfillrategrafComponent } from './repfillrategraf.component';

describe('RepfillrategrafComponent', () => {
  let component: RepfillrategrafComponent;
  let fixture: ComponentFixture<RepfillrategrafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepfillrategrafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepfillrategrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
