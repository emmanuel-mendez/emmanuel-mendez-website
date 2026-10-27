import { afterRenderEffect, Component, inject, OnDestroy, output, signal } from '@angular/core';
import { Button } from '@components/atoms/button/button';
import {
  FeaturedProject,
  type FeaturedProjectModel,
} from '@components/molecules/featured-project/featured-project';
import { CarouselComponent, CarouselModule, type OwlOptions } from 'ngx-owl-carousel-o';
import { Devices, Responsive } from '@services/responsive/responsive';

@Component({
  selector: 'app-banner',
  imports: [Button, FeaturedProject, CarouselModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner implements OnDestroy {
  private readonly responsive = inject(Responsive);
  private previousCarouselDevices: readonly Devices[] | undefined;
  private initialAutoplayTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly initialAutoplayDelay: number = 2000;

  public readonly isCarouselRendered = signal(true);
  public readonly featuredProjects: readonly FeaturedProjectModel[] = [
    {
      name: 'Astyimar y Emmanuel',
      projectRoute: ['/projects/astyimar-y-emmanuel'],
      desktopImageSrc: '/webp/astyimar-emmanuel-wedding--desktop.webp',
      desktopImageAlt: 'Astyimar and Emmanuel wedding website desktop preview',
      mobileImageSrc: '/webp/astyimar-emmanuel-wedding--mobile.webp',
      mobileImageAlt: 'Astyimar and Emmanuel wedding website mobile preview',
      tabletImageSrc: '/webp/astyimar-emmanuel-wedding--tablet.webp',
      tabletImageAlt: 'Astyimar and Emmanuel wedding website tablet preview',
      badgeIcon: 'bookmark',
      footerIcon: 'arrow_forward',
    },
    {
      name: 'Website',
      projectRoute: ['/projects/emmanuel-mendez-website'],
      desktopImageSrc: '/webp/astyimar-emmanuel-wedding--desktop.webp',
      desktopImageAlt: 'Astyimar and Emmanuel wedding website desktop preview',
      mobileImageSrc: '/webp/astyimar-emmanuel-wedding--mobile.webp',
      mobileImageAlt: 'Astyimar and Emmanuel wedding website mobile preview',
      tabletImageSrc: '/webp/astyimar-emmanuel-wedding--tablet.webp',
      tabletImageAlt: 'Astyimar and Emmanuel wedding website tablet preview',
      badgeIcon: 'bookmark',
      footerIcon: 'arrow_forward',
    },
    {
      name: 'Toyota',
      projectRoute: ['/projects/toyota'],
      desktopImageSrc: '/webp/astyimar-emmanuel-wedding--desktop.webp',
      desktopImageAlt: 'Astyimar and Emmanuel wedding website desktop preview',
      mobileImageSrc: '/webp/astyimar-emmanuel-wedding--mobile.webp',
      mobileImageAlt: 'Astyimar and Emmanuel wedding website mobile preview',
      tabletImageSrc: '/webp/astyimar-emmanuel-wedding--tablet.webp',
      tabletImageAlt: 'Astyimar and Emmanuel wedding website tablet preview',
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
    lazyLoad: true,
    margin: 25,
  };

  public readonly contactRequested = output<void>();

  public onCarouselInitialized(carousel: CarouselComponent): void {
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
  }

  constructor() {
    afterRenderEffect((onCleanup) => {
      const devices = this.responsive.device();
      if (this.previousCarouselDevices === undefined) {
        this.previousCarouselDevices = devices;
        return;
      }

      const devicesChanged =
        devices.length !== this.previousCarouselDevices.length ||
        devices.some((device, index) => device !== this.previousCarouselDevices?.[index]);
      if (!devicesChanged) return;

      this.previousCarouselDevices = devices;
      this.clearInitialAutoplayTimer();
      this.isCarouselRendered.set(false);
      const renderFrame = requestAnimationFrame(() => this.isCarouselRendered.set(true));

      onCleanup(() => cancelAnimationFrame(renderFrame));
    });
  }

  private clearInitialAutoplayTimer(): void {
    if (this.initialAutoplayTimer === undefined) return;

    clearTimeout(this.initialAutoplayTimer);
    this.initialAutoplayTimer = undefined;
  }
}
