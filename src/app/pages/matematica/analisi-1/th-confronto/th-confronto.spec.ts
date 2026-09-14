import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThConfronto } from './th-confronto';

describe('ThConfronto', () => {
  let component: ThConfronto;
  let fixture: ComponentFixture<ThConfronto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThConfronto],
    }).compileComponents();

    fixture = TestBed.createComponent(ThConfronto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
