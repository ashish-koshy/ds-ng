import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 data structure cards', () => {
    expect(component.cards.length).toBe(6);
  });

  it('should render a card for each data structure', () => {
    const cards = fixture.nativeElement.querySelectorAll('.ds-card');
    expect(cards.length).toBe(6);
  });

  it('should have correct routes for each card', () => {
    const routes = component.cards.map((c) => c.route);
    expect(routes).toContain('/array');
    expect(routes).toContain('/linked-list');
    expect(routes).toContain('/stack');
    expect(routes).toContain('/queue');
    expect(routes).toContain('/tree');
    expect(routes).toContain('/graph');
  });
});
