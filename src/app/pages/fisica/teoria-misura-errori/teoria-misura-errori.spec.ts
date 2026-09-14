import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeoriaMisuraErrori } from './teoria-misura-errori';

describe('TeoriaMisuraErrori', () => {
  let component: TeoriaMisuraErrori;
  let fixture: ComponentFixture<TeoriaMisuraErrori>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeoriaMisuraErrori],
    }).compileComponents();

    fixture = TestBed.createComponent(TeoriaMisuraErrori);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
