import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FeaturedProject,
  type FeaturedProjectModel,
} from '@components/molecules/featured-project/featured-project';

@Component({
  selector: 'app-banner',
  imports: [RouterLink, FeaturedProject],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  public readonly featuredProject: FeaturedProjectModel = {
    name: 'Astyimar y Emmanuel Wedding',
    projectRoute: ['/projects/astyimar-emmanuel-wedding'],
    desktopImageSrc: '/webp/astyimar-emmanuel-wedding--desktop.webp',
    desktopImageAlt: 'Astyimar and Emmanuel wedding website desktop preview',
    mobileImageSrc: '/webp/astyimar-emmanuel-wedding--mobile.webp',
    mobileImageAlt: 'Astyimar and Emmanuel wedding website mobile preview',
    tabletImageSrc: '/webp/astyimar-emmanuel-wedding--tablet.webp',
    tabletImageAlt: 'Astyimar and Emmanuel wedding website tablet preview',
    badgeIcon: 'bookmark',
    footerIcon: 'arrow_forward',
  };

  public readonly contactRequested = output<void>();
}
