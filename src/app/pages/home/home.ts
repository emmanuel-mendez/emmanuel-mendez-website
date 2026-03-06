import { Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Banner } from '@components/organisms/banner/banner';
import { Layout } from '@components/templates/layout/layout';
import { Testimonials } from '@components/organisms/testimonials/testimonials';
import { JobExperience } from '@components/organisms/job-experience/job-experience';
import { Contact } from '@components/organisms/contact/contact';
import { ProjectsSection } from '@components/organisms/projects/projects';
import { Skills } from '@components/organisms/skills/skills';
import { About } from '@components/organisms/about/about';

@Component({
  selector: 'app-home',
  imports: [Layout, Banner, About, Skills, ProjectsSection, JobExperience, Testimonials, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.metaService.addTags([{ property: 'og:title', content: 'Home - Emmanuel Mendez' }]);
  }
}
