import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GruppoAbeliano } from './gruppo-abeliano';

describe('GruppoAbeliano', () => {
  let component: GruppoAbeliano;
  let fixture: ComponentFixture<GruppoAbeliano>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruppoAbeliano],
    }).compileComponents();

    fixture = TestBed.createComponent(GruppoAbeliano);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
