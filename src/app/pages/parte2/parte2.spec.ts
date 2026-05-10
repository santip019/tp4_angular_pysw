import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parte2 } from './parte2';

describe('Parte2', () => {
  let component: Parte2;
  let fixture: ComponentFixture<Parte2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Parte2],
    }).compileComponents();

    fixture = TestBed.createComponent(Parte2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
