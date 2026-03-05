import { Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Layout } from '@components/templates/layout/layout';
import { Responsive } from '@services/responsive/responsive';
import { ResponsiveIncludes } from '@pipes/responsive/includes/includes';
import { ProjectsSection } from '@components/organisms/projects/projects';

@Component({
  selector: 'app-home',
  imports: [Layout, ResponsiveIncludes, ProjectsSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private metaService = inject(Meta);
  public responsive = inject(Responsive);

  ngOnInit(): void {
    this.metaService.addTags([{ property: 'og:title', content: 'Home - Emmanuel Mendez' }]);
  }
}
