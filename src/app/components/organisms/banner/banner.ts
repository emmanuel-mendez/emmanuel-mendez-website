import { Component, output } from '@angular/core';
import { Button } from '@components/atoms/button/button';
import { FeaturedProjectsCarousel } from '@components/organisms/featured-projects-carousel/featured-projects-carousel';

@Component({
  selector: 'app-banner',
  imports: [Button, FeaturedProjectsCarousel],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  public readonly contactRequested = output<void>();
}
