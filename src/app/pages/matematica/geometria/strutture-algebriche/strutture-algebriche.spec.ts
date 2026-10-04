import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StruttureAlgebriche } from './strutture-algebriche';

describe('StruttureAlgebriche', () => {
  let component: StruttureAlgebriche;
  let fixture: ComponentFixture<StruttureAlgebriche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StruttureAlgebriche],
    }).compileComponents();

    fixture = TestBed.createComponent(StruttureAlgebriche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
