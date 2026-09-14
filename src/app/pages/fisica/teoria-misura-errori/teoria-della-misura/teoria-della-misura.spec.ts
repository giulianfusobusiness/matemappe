import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeoriaDellaMisura } from './teoria-della-misura';

describe('TeoriaDellaMisura', () => {
  let component: TeoriaDellaMisura;
  let fixture: ComponentFixture<TeoriaDellaMisura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeoriaDellaMisura],
    }).compileComponents();

    fixture = TestBed.createComponent(TeoriaDellaMisura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
