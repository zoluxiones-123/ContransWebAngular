import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepfillratetabComponent } from './repfillratetab.component';

describe('RepfillratetabComponent', () => {
  let component: RepfillratetabComponent;
  let fixture: ComponentFixture<RepfillratetabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepfillratetabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepfillratetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
