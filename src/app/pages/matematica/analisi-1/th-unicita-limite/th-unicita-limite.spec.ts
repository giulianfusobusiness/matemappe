import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThUnicitaLimite } from './th-unicita-limite';

describe('ThUnicitaLimite', () => {
  let component: ThUnicitaLimite;
  let fixture: ComponentFixture<ThUnicitaLimite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThUnicitaLimite],
    }).compileComponents();

    fixture = TestBed.createComponent(ThUnicitaLimite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
