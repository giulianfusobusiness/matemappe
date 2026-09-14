import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElettromagnetismoOnde } from './elettromagnetismo-onde';

describe('ElettromagnetismoOnde', () => {
  let component: ElettromagnetismoOnde;
  let fixture: ComponentFixture<ElettromagnetismoOnde>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElettromagnetismoOnde],
    }).compileComponents();

    fixture = TestBed.createComponent(ElettromagnetismoOnde);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
