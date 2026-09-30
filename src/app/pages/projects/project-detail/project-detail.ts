import { Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Layout } from '@components/templates/layout/layout';
import { Page } from '@services/page/page';
import { Project, ProjectsData } from '@services/projects/projects-data';
import { Button } from '@components/atoms/button/button';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [Button, Layout, RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly pageService = inject(Page);
  private readonly projectsData = inject(ProjectsData);

  private readonly slug: Signal<string> = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' }
  );

  public readonly project: Signal<Project | undefined> = computed(() =>
    this.projectsData.getBySlug(this.slug())
  );

  constructor() {
    const currentSlug = this.route.snapshot.paramMap.get('slug') ?? '';
    const currentProject = this.projectsData.getBySlug(currentSlug);
    if (currentProject) {
      this.pageService.setMetaTags(currentProject.description);
    }
  }
}
