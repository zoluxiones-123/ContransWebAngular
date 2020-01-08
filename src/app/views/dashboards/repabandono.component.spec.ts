import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepabandonoComponent } from './repabandono.component';

describe('RepabandonoComponent', () => {
  let component: RepabandonoComponent;
  let fixture: ComponentFixture<RepabandonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepabandonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepabandonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
