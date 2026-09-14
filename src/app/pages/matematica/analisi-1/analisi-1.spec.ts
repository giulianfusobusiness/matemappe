import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Analisi1 } from './analisi-1';

describe('Analisi1', () => {
  let component: Analisi1;
  let fixture: ComponentFixture<Analisi1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Analisi1],
    }).compileComponents();

    fixture = TestBed.createComponent(Analisi1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
