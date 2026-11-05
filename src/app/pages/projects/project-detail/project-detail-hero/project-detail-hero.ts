import { Component, computed, input } from '@angular/core';
import { Project, ProjectRole } from '@services/projects/projects-data';

type ProjectDetailFact = Readonly<{
  label: string;
  value: string;
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
  selector: 'app-project-detail-hero',
  templateUrl: './project-detail-hero.html',
  styleUrl: './project-detail-hero.css',
})
export class ProjectDetailHero {
  public readonly project = input.required<Project>();

  public readonly roleLabel = computed<string>(() => ROLE_LABELS[this.project().rol]);

  public readonly factItems = computed<readonly ProjectDetailFact[]>(() => {
    const project: Project = this.project();
    return [
      ...(project.year === undefined ? [] : [{ label: 'Year', value: String(project.year) }]),
      ...(project.timeline ? [{ label: 'Timeline', value: project.timeline }] : []),
      ...(project.scope ? [{ label: 'Scope', value: project.scope }] : []),
    ];
  });

  public readonly actions = computed<readonly ProjectDetailAction[]>(() => {
    const project: Project = this.project();
    return [
      ...(project.sourceCode
        ? [
            {
              label: 'Source',
              href: project.sourceCode,
              icon: 'code',
              ariaLabel: `Open source code for ${project.title}`,
            },
          ]
        : []),
    ];
  });
}
