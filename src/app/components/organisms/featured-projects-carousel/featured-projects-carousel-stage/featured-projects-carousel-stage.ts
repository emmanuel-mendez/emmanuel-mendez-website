import { isPlatformBrowser } from '@angular/common';
import {
  afterRenderEffect,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FeaturedProject,
  type FeaturedProjectImages,
  type FeaturedProjectModel,
} from '@components/molecules/featured-project/featured-project';
import { CarouselComponent, CarouselModule, type OwlOptions } from 'ngx-owl-carousel-o';

const WEDDING_PREVIEW_IMAGES: FeaturedProjectImages = {
  desktop: {
    src: '/webp/astyimar-emmanuel-wedding--desktop-1280w.webp',
    srcset:
      '/webp/astyimar-emmanuel-wedding--desktop-768w.webp 768w, /webp/astyimar-emmanuel-wedding--desktop-1280w.webp 1280w, /webp/astyimar-emmanuel-wedding--desktop-1920w.webp 1920w',
    sizes: '(min-width: 1024px) 45vw, calc(100vw - 7.5rem)',
    width: 1920,
    height: 1080,
    alt: 'Astyimar and Emmanuel wedding website desktop preview',
  },
  mobile: {
    src: '/webp/astyimar-emmanuel-wedding--mobile-480w.webp',
    srcset:
      '/webp/astyimar-emmanuel-wedding--mobile-240w.webp 240w, /webp/astyimar-emmanuel-wedding--mobile-480w.webp 480w',
    sizes: '(min-width: 1024px) 6vw, calc(12vw - 0.9rem)',
    width: 480,
    height: 897,
    alt: 'Astyimar and Emmanuel wedding website mobile preview',
  },
  tablet: {
    src: '/webp/astyimar-emmanuel-wedding--tablet-960w.webp',
    srcset:
      '/webp/astyimar-emmanuel-wedding--tablet-480w.webp 480w, /webp/astyimar-emmanuel-wedding--tablet-960w.webp 960w, /webp/astyimar-emmanuel-wedding--tablet-1600w.webp 1600w',
    sizes: '(min-width: 1024px) 18vw, calc(40vw - 3rem)',
    width: 1600,
    height: 976,
    alt: 'Astyimar and Emmanuel wedding website tablet preview',
  },
};

@Component({
  selector: 'app-featured-projects-carousel-stage',
  imports: [FeaturedProject, CarouselModule],
  templateUrl: './featured-projects-carousel-stage.html',
  styleUrl: './featured-projects-carousel-stage.css',
  // .owl-stage and .owl-item are rendered inside the ngx-owl-carousel-o view, so only global styles can reach them.
  encapsulation: ViewEncapsulation.None,
  host: { class: 'featured-projects-carousel-stage' },
})
export class FeaturedProjectsCarouselStage implements OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly owlCarousel = viewChild.required(CarouselComponent);
  private initialAutoplayTimer: ReturnType<typeof setTimeout> | undefined;
  private tabStopsSyncFrame: number | undefined;
  private readonly initialAutoplayDelay: number = 2000;

  public readonly featuredProjects: readonly FeaturedProjectModel[] = [
    {
      name: 'Astyimar y Emmanuel',
      projectRoute: ['/projects/astyimar-y-emmanuel'],
      images: WEDDING_PREVIEW_IMAGES,
      badgeIcon: 'bookmark',
      footerIcon: 'arrow_forward',
    },
    {
      name: 'Website',
      projectRoute: ['/projects/emmanuel-mendez-website'],
      images: WEDDING_PREVIEW_IMAGES,
      badgeIcon: 'bookmark',
      footerIcon: 'arrow_forward',
    },
    {
      name: 'Toyota',
      projectRoute: ['/projects/toyota'],
      images: WEDDING_PREVIEW_IMAGES,
      badgeIcon: 'bookmark',
      footerIcon: 'arrow_forward',
    },
  ];

  public readonly carouselOptions: OwlOptions = {
    items: 1,
    loop: true,
    center: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2000,
    autoplaySpeed: 2000,
    autoplayMouseleaveTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    lazyLoad: false,
    margin: 25,
  };

  public prev(): void {
    this.owlCarousel().prev();
  }

  public next(): void {
    this.owlCarousel().next();
  }

  public onCarouselInitialized(carousel: CarouselComponent): void {
    if (!this.isBrowser) return;

    this.clearInitialAutoplayTimer();
    this.initialAutoplayTimer = setTimeout(() => {
      this.initialAutoplayTimer = undefined;
      carousel.next();
    }, this.initialAutoplayDelay);
  }

  public onCarouselChange(): void {
    this.clearInitialAutoplayTimer();
  }

  public ngOnDestroy(): void {
    this.clearInitialAutoplayTimer();
    this.cancelTabStopsSyncFrame();
  }

  constructor() {
    afterRenderEffect((onCleanup) => {
      const carouselElement: HTMLElement | null =
        this.elementRef.nativeElement.querySelector('owl-carousel-o');
      if (!carouselElement) return;

      const observer = new MutationObserver(() => this.scheduleHiddenSlideTabStopsSync());
      observer.observe(carouselElement, {
        attributes: true,
        attributeFilter: ['aria-hidden'],
        childList: true,
        subtree: true,
      });
      this.scheduleHiddenSlideTabStopsSync();

      onCleanup(() => observer.disconnect());
    });
  }

  private clearInitialAutoplayTimer(): void {
    if (this.initialAutoplayTimer === undefined) return;

    clearTimeout(this.initialAutoplayTimer);
    this.initialAutoplayTimer = undefined;
  }

  private scheduleHiddenSlideTabStopsSync(): void {
    if (this.tabStopsSyncFrame !== undefined) return;

    this.tabStopsSyncFrame = requestAnimationFrame(() => {
      this.tabStopsSyncFrame = undefined;
      this.syncHiddenSlideTabStops();
    });
  }

  private cancelTabStopsSyncFrame(): void {
    if (this.tabStopsSyncFrame === undefined) return;

    cancelAnimationFrame(this.tabStopsSyncFrame);
    this.tabStopsSyncFrame = undefined;
  }

  private syncHiddenSlideTabStops(): void {
    const slides: NodeListOf<HTMLElement> =
      this.elementRef.nativeElement.querySelectorAll('.owl-item');

    slides.forEach((slide: HTMLElement) => {
      const isHidden: boolean = slide.getAttribute('aria-hidden') === 'true';
      const focusableElements: NodeListOf<HTMLElement> = slide.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]',
      );

      focusableElements.forEach((element: HTMLElement) => {
        if (isHidden) {
          element.setAttribute('tabindex', '-1');
          return;
        }

        if (element.getAttribute('tabindex') === '-1') {
          element.removeAttribute('tabindex');
        }
      });
    });
  }
}
