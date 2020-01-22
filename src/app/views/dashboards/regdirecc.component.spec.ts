import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegdireccComponent } from './regdirecc.component';

describe('RegdireccComponent', () => {
  let component: RegdireccComponent;
  let fixture: ComponentFixture<RegdireccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegdireccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegdireccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
