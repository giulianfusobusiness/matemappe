import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThInversoPermanenzaSegno } from './th-inverso-permanenza-segno';

describe('ThInversoPermanenzaSegno', () => {
  let component: ThInversoPermanenzaSegno;
  let fixture: ComponentFixture<ThInversoPermanenzaSegno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThInversoPermanenzaSegno],
    }).compileComponents();

    fixture = TestBed.createComponent(ThInversoPermanenzaSegno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
