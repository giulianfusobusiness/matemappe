import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThPermanenzaSegno } from './th-permanenza-segno';

describe('ThPermanenzaSegno', () => {
  let component: ThPermanenzaSegno;
  let fixture: ComponentFixture<ThPermanenzaSegno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThPermanenzaSegno],
    }).compileComponents();

    fixture = TestBed.createComponent(ThPermanenzaSegno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
