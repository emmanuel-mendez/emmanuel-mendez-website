import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, type WritableSignal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { FeaturedProject } from '@components/molecules/featured-project/featured-project';
import { Devices, Responsive } from '@services/responsive/responsive';

import { Banner } from './banner';

describe('Banner', () => {
  let fixture: ComponentFixture<Banner>;
  let device: WritableSignal<Devices[]>;

  beforeEach(async () => {
    device = signal<Devices[]>([Devices.DESKTOP, Devices.DESKTOP_SHORT]);
    await TestBed.configureTestingModule({
      imports: [Banner],
      providers: [
        provideRouter([]),
        {
          provide: Responsive,
          useValue: { device },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Banner);
    fixture.detectChanges();
  });

  it('should render title and project links', () => {
    const element: HTMLElement = fixture.nativeElement;
    const titleLines = Array.from(element.querySelectorAll('.banner__title-line')) as HTMLElement[];
    const actions = Array.from(element.querySelectorAll('app-button'));

    expect(titleLines).toHaveLength(2);
    expect(actions).toHaveLength(2);
    expect(actions[0]?.querySelector('a')).not.toBeNull();
    expect(actions[1]?.querySelector('button')).not.toBeNull();
  });

  it('should render featured projects inside the carousel', () => {
    const element: HTMLElement = fixture.nativeElement;
    const carousel = fixture.debugElement.query(By.directive(CarouselComponent))
      .componentInstance as CarouselComponent;
    const renderedProject = fixture.debugElement.query(By.directive(FeaturedProject))
      .componentInstance as FeaturedProject;

    expect(element.querySelector('owl-carousel-o')).not.toBeNull();
    expect(carousel.slides.length).toBe(fixture.componentInstance.featuredProjects.length);
    expect(element.querySelectorAll('app-featured-project').length).toBeGreaterThan(0);
    expect(fixture.componentInstance.featuredProjects).toContain(renderedProject.project());
  });

  it('should keep the recurring autoplay interval unchanged', () => {
    expect(fixture.componentInstance.carouselOptions.autoplayTimeout).toBe(5000);
    expect(fixture.componentInstance.carouselOptions.autoplaySpeed).toBe(2000);
    expect(fixture.componentInstance.carouselOptions.smartSpeed).toBe(2000);
  });

  it('should trigger the first autoplay move after the shorter delay', () => {
    vi.useFakeTimers();
    const carousel = fixture.debugElement.query(By.directive(CarouselComponent))
      .componentInstance as CarouselComponent;
    const nextSpy = vi.spyOn(carousel, 'next');

    fixture.componentInstance.onCarouselInitialized(carousel);
    vi.advanceTimersByTime(1999);
    expect(nextSpy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(nextSpy).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it('should cancel the initial autoplay move when the carousel changes', () => {
    vi.useFakeTimers();
    const carousel = fixture.debugElement.query(By.directive(CarouselComponent))
      .componentInstance as CarouselComponent;
    const nextSpy = vi.spyOn(carousel, 'next');

    fixture.componentInstance.onCarouselInitialized(carousel);
    fixture.componentInstance.onCarouselChange();
    vi.advanceTimersByTime(2000);

    expect(nextSpy).not.toHaveBeenCalled();
    vi.useRealTimers();
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

  it('should recreate the carousel when the responsive device changes', async () => {
    const carouselBeforeResize = fixture.debugElement.query(By.directive(CarouselComponent))
      .componentInstance as CarouselComponent;

    device.set([Devices.TABLET]);
    fixture.detectChanges();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    fixture.detectChanges();
    await fixture.whenStable();

    const carouselAfterResize = fixture.debugElement.query(By.directive(CarouselComponent))
      .componentInstance as CarouselComponent;

    expect(carouselAfterResize).not.toBe(carouselBeforeResize);
    expect(fixture.componentInstance.carouselOptions.autoplayTimeout).toBe(5000);
  });
});
