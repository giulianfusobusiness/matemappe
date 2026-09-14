import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Conduttori } from './conduttori';

describe('Conduttori', () => {
  let component: Conduttori;
  let fixture: ComponentFixture<Conduttori>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conduttori],
    }).compileComponents();

    fixture = TestBed.createComponent(Conduttori);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
