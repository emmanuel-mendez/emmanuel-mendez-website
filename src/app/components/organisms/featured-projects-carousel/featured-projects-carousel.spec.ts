import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, type WritableSignal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { Devices, Responsive } from '@services/responsive/responsive';

import { FeaturedProjectsCarousel } from './featured-projects-carousel';

describe('FeaturedProjectsCarousel', () => {
  let fixture: ComponentFixture<FeaturedProjectsCarousel>;
  let device: WritableSignal<Devices[]>;

  beforeEach(async () => {
    device = signal<Devices[]>([Devices.DESKTOP, Devices.DESKTOP_SHORT]);
    await TestBed.configureTestingModule({
      imports: [FeaturedProjectsCarousel],
      providers: [
        provideRouter([]),
        {
          provide: Responsive,
          useValue: { device },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(FeaturedProjectsCarousel);
    fixture.detectChanges();
  });

  it('should use the custom navigation controls to move between projects', () => {
    const element: HTMLElement = fixture.nativeElement;
    const carousel = fixture.debugElement.query(By.directive(CarouselComponent))
      .componentInstance as CarouselComponent;
    const previousButton = element.querySelector<HTMLButtonElement>(
      '[aria-label="Previous featured project"]',
    );
    const nextButton = element.querySelector<HTMLButtonElement>(
      '[aria-label="Next featured project"]',
    );
    const previousSpy = vi.spyOn(carousel, 'prev');
    const nextSpy = vi.spyOn(carousel, 'next');

    previousButton?.click();
    nextButton?.click();

    expect(previousSpy).toHaveBeenCalledOnce();
    expect(nextSpy).toHaveBeenCalledOnce();
  });

  it('should remove focusable content of hidden carousel slides from the tab order', async () => {
    const nextFrame = (): Promise<void> =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const element: HTMLElement = fixture.nativeElement;
    const carouselElement = element.querySelector<HTMLElement>('owl-carousel-o');
    expect(carouselElement).toBeTruthy();

    const hiddenSlide = document.createElement('div');
    hiddenSlide.classList.add('owl-item');
    const hiddenLink = document.createElement('a');
    hiddenLink.href = '/projects/hidden';
    hiddenSlide.appendChild(hiddenLink);

    const visibleSlide = document.createElement('div');
    visibleSlide.classList.add('owl-item');
    const visibleLink = document.createElement('a');
    visibleLink.href = '/projects/visible';
    visibleSlide.appendChild(visibleLink);

    carouselElement?.appendChild(hiddenSlide);
    carouselElement?.appendChild(visibleSlide);
    hiddenSlide.setAttribute('aria-hidden', 'true');

    await nextFrame();
    await nextFrame();

    expect(hiddenLink.getAttribute('tabindex')).toBe('-1');
    expect(visibleLink.getAttribute('tabindex')).toBeNull();

    hiddenSlide.setAttribute('aria-hidden', 'false');
    await nextFrame();
    await nextFrame();

    expect(hiddenLink.getAttribute('tabindex')).toBeNull();
  });
});
