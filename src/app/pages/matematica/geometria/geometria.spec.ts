import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Geometria } from './geometria';

describe('Geometria', () => {
  let component: Geometria;
  let fixture: ComponentFixture<Geometria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Geometria],
    }).compileComponents();

    fixture = TestBed.createComponent(Geometria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
