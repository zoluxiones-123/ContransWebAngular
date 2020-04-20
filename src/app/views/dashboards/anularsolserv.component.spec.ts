import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularsolservComponent } from './anularsolserv.component';

describe('AnularsolservComponent', () => {
  let component: AnularsolservComponent;
  let fixture: ComponentFixture<AnularsolservComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularsolservComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularsolservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
