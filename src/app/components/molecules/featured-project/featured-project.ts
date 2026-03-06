import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type FeaturedProjectModel = Readonly<{
  name: string;
  projectRoute: readonly string[];
  desktopImageSrc: string;
  desktopImageAlt: string;
  mobileImageSrc: string;
  mobileImageAlt: string;
  tabletImageSrc: string;
  tabletImageAlt: string;
  badgeIcon: string;
  footerIcon: string;
}>;

@Component({
  selector: 'app-featured-project',
  imports: [RouterLink],
  templateUrl: './featured-project.html',
  styleUrl: './featured-project.css',
})
export class FeaturedProject {
  public readonly project = input.required<FeaturedProjectModel>();
}
