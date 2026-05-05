import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actividad1 } from './actividad1';

describe('actividad1', () => {
  let component: Actividad1;
  let fixture: ComponentFixture<Actividad1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actividad1],
    }).compileComponents();

    fixture = TestBed.createComponent(Actividad1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
