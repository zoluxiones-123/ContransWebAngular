import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepstockcliComponent } from './repstockcli.component';

describe('RepstockcliComponent', () => {
  let component: RepstockcliComponent;
  let fixture: ComponentFixture<RepstockcliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepstockcliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepstockcliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
