import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type FeaturedProjectImage = Readonly<{
  src: string;
  srcset: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
}>;

export type FeaturedProjectImages = Readonly<{
  desktop: FeaturedProjectImage;
  mobile: FeaturedProjectImage;
  tablet: FeaturedProjectImage;
}>;

export type FeaturedProjectModel = Readonly<{
  name: string;
  projectRoute: readonly string[];
  images: FeaturedProjectImages;
  badgeIcon: string;
  footerIcon: string;
}>;

export type FeaturedProjectLoading = 'lazy' | 'eager';
export type FeaturedProjectFetchPriority = 'high' | 'low' | 'auto';

@Component({
  selector: 'app-featured-project',
  imports: [RouterLink],
  templateUrl: './featured-project.html',
  styleUrl: './featured-project.css',
})
export class FeaturedProject {
  public readonly project = input.required<FeaturedProjectModel>();
  public readonly loading = input<FeaturedProjectLoading>('lazy');
  public readonly fetchpriority = input<FeaturedProjectFetchPriority>('auto');
}
