import { Component, computed, effect, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Layout } from '@components/templates/layout/layout';
import { Page } from '@services/page/page';
import { Project, ProjectRole, ProjectsData } from '@services/projects/projects-data';

type ProjectDetailFact = Readonly<{
  label: string;
  value: string;
}>;

type ProjectDetailListSection = Readonly<{
  title: string;
  items: readonly string[];
  ariaLabel: string;
}>;

type ProjectDetailAction = Readonly<{
  label: string;
  href: string;
  icon: string;
  ariaLabel: string;
}>;

const ROLE_LABELS: Readonly<Record<ProjectRole, string>> = {
  author: 'Author',
  collaborator: 'Collaborator',
};

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [Layout, RouterLink],
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

  public readonly roleLabel = computed(() => {
    const role = this.project()?.rol;
    return role ? ROLE_LABELS[role] : '';
  });

  public readonly factItems = computed<readonly ProjectDetailFact[]>(() => {
    const currentProject = this.project();
    return currentProject
      ? [
        { label: 'Role', value: ROLE_LABELS[currentProject.rol] },
        ...(currentProject.year === undefined
          ? []
          : [{ label: 'Year', value: String(currentProject.year) }]),
        ...(currentProject.timeline
          ? [{ label: 'Timeline', value: currentProject.timeline }]
          : []),
        ...(currentProject.scope ? [{ label: 'Scope', value: currentProject.scope }] : []),
      ]
      : [];
  });

  public readonly detailSections = computed<readonly ProjectDetailListSection[]>(() => {
    const currentProject = this.project();
    const sections: readonly ProjectDetailListSection[] = [
      {
        title: 'Products',
        items: currentProject?.products ?? [],
        ariaLabel: 'Products list',
      },
      {
        title: 'Modules',
        items: currentProject?.modules ?? [],
        ariaLabel: 'Modules list',
      },
      {
        title: 'Responsibilities',
        items: currentProject?.responsibilities ?? [],
        ariaLabel: 'Responsibilities list',
      },
    ];
    return sections.filter((section) => section.items.length > 0);
  });

  public readonly actions = computed<readonly ProjectDetailAction[]>(() => {
    const currentProject = this.project();
    if (!currentProject) {
      return [];
    }

    return [
      ...(currentProject.sourceCode
        ? [
          {
            label: 'Source',
            href: currentProject.sourceCode,
            icon: 'code',
            ariaLabel: `Open source code for ${currentProject.title}`,
          },
        ]
        : []),
    ];
  });

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
