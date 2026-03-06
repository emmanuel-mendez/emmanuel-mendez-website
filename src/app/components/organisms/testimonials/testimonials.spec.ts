import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonials } from './testimonials';

describe('Testimonials', () => {
  let component: Testimonials;
  let fixture: ComponentFixture<Testimonials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonials],
    }).compileComponents();

    fixture = TestBed.createComponent(Testimonials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a non-empty testimonials list', () => {
    expect(component.testimonials.length).toBeGreaterThan(0);
  });

  it('should render a testimonials card for each item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.testimonials__card');
    expect(cards.length).toBe(component.testimonials.length);
  });

  it('should have valid ratings between 1 and 5', () => {
    for (const t of component.testimonials) {
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    }
  });
});
