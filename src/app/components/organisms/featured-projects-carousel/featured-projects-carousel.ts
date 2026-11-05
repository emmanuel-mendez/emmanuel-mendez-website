import { afterRenderEffect, Component, inject, signal } from '@angular/core';
import { FeaturedProjectsCarouselStage } from '@components/organisms/featured-projects-carousel/featured-projects-carousel-stage/featured-projects-carousel-stage';
import { Devices, Responsive } from '@services/responsive/responsive';

@Component({
  selector: 'app-featured-projects-carousel',
  imports: [FeaturedProjectsCarouselStage],
  templateUrl: './featured-projects-carousel.html',
  styleUrl: './featured-projects-carousel.css',
  host: { class: 'featured-projects-carousel' },
})
export class FeaturedProjectsCarousel {
  private readonly responsive = inject(Responsive);
  private previousCarouselDevices: readonly Devices[] | undefined;

  public readonly isCarouselRendered = signal(true);

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
      this.isCarouselRendered.set(false);
      const renderFrame = requestAnimationFrame(() => this.isCarouselRendered.set(true));

      onCleanup(() => cancelAnimationFrame(renderFrame));
    });
  }
}
