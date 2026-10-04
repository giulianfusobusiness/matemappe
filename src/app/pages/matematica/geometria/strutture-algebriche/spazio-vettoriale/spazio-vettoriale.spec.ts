import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpazioVettoriale } from './spazio-vettoriale';

describe('SpazioVettoriale', () => {
  let component: SpazioVettoriale;
  let fixture: ComponentFixture<SpazioVettoriale>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpazioVettoriale],
    }).compileComponents();

    fixture = TestBed.createComponent(SpazioVettoriale);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
