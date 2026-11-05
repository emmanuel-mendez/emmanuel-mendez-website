import { Component, computed, effect, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Layout } from '@components/templates/layout/layout';
import { Page } from '@services/page/page';
import { Project, ProjectsData } from '@services/projects/projects-data';
import { ProjectDetailHero } from './project-detail-hero/project-detail-hero';
import { ProjectDetailSection } from './project-detail-section/project-detail-section';
import { ProjectDetailHighlights } from './project-detail-highlights/project-detail-highlights';
import { ProjectDetailDeliverables } from './project-detail-deliverables/project-detail-deliverables';
import { ProjectDetailRoadmap } from './project-detail-roadmap/project-detail-roadmap';
import { ProjectDetailTechnologies } from './project-detail-technologies/project-detail-technologies';
import { Container } from '@components/molecules/container/container';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    Layout,
    RouterLink,
    ProjectDetailHero,
    ProjectDetailSection,
    ProjectDetailHighlights,
    ProjectDetailDeliverables,
    ProjectDetailRoadmap,
    ProjectDetailTechnologies,
    Container,
  ],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly pageService = inject(Page);
  private readonly projectsData = inject(ProjectsData);

  private readonly slug: Signal<string> = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  public readonly project: Signal<Project | undefined> = computed(() =>
    this.projectsData.getBySlug(this.slug()),
  );

  constructor() {
    effect(() => {
      const description = this.project()?.description;
      if (!description) {
        return;
      }

      this.pageService.setMetaTags(description);
    });
  }
}
