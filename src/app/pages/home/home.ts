import { Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Layout } from '@components/templates/layout/layout';
import { Testimonials } from '@components/organisms/testimonials/testimonials';
import { JobExperience } from '@components/organisms/job-experience/job-experience';
import { Responsive } from '@services/responsive/responsive';
import { ResponsiveIncludes } from '@pipes/responsive/includes/includes';
import { Contact } from '@components/organisms/contact/contact';
import { ProjectsSection } from '@components/organisms/projects/projects';
import { Skills } from '@components/organisms/skills/skills';

@Component({
  selector: 'app-home',
  imports: [Layout, About, Skills, ProjectsSection, JobExperience, Testimonials, Contact, ResponsiveIncludes],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private metaService = inject(Meta);

  ngOnInit(): void {
    this.metaService.addTags([{ property: 'og:title', content: 'Home - Emmanuel Mendez' }]);
  }
}
