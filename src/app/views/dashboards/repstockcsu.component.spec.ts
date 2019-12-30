import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepstockcsuComponent } from './repstockcsu.component';

describe('RepstockcsuComponent', () => {
  let component: RepstockcsuComponent;
  let fixture: ComponentFixture<RepstockcsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepstockcsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepstockcsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
