import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Simulateur2Component } from './simulateur2.component';

describe('Simulateur2Component', () => {
  let component: Simulateur2Component;
  let fixture: ComponentFixture<Simulateur2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Simulateur2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Simulateur2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
