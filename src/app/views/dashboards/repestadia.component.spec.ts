import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepestadiaComponent } from './repestadia.component';

describe('RepestadiaComponent', () => {
  let component: RepestadiaComponent;
  let fixture: ComponentFixture<RepestadiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepestadiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepestadiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
