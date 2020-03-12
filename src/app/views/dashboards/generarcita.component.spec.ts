import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarcitaComponent } from './generarcita.component';

describe('GenerarcitaComponent', () => {
  let component: GenerarcitaComponent;
  let fixture: ComponentFixture<GenerarcitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarcitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarcitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
