import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Filter, FilterCategory } from '@components/molecules/filter/filter';
import { Layout } from '@components/templates/layout/layout';
import { Page } from '@services/page/page';
import { Project, ProjectsData } from '@services/projects/projects-data';

type ProjectSort = 'alphabetical' | 'year';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [Layout, RouterLink, Filter],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private readonly pageService = inject(Page);
  private readonly projectsData = inject(ProjectsData);

  public readonly projects = this.projectsData.projects;
  public readonly filteredProjects = signal<readonly Project[]>(this.projects);
  public readonly sort = signal<ProjectSort>('alphabetical');
  public readonly isFilterDialogOpen = signal(false);
  public readonly categories = computed<readonly FilterCategory<Project>[]>(() => [
    {
      name: 'Technology',
      property: 'technologies',
      properties: [...new Set(this.projects.flatMap((project) => project.technologies))].sort(),
    },
    {
      name: 'Year',
      property: 'year',
      properties: [...new Set(this.projects.map((project) => String(project.year)))].sort(
        (first, second) => Number(second) - Number(first),
      ),
    },
  ]);
  public readonly displayedProjects = computed(() => {
    const titleOrder = (first: Project, second: Project): number =>
      first.title.localeCompare(second.title, undefined, { sensitivity: 'base' });

    return [...this.filteredProjects()].sort((first, second) =>
      this.sort() === 'alphabetical'
        ? titleOrder(first, second)
        : second.year - first.year || titleOrder(first, second),
    );
  });

  private readonly DESCRIPTION =
    'Projects - Emmanuel Mendez / +3 years of experience creating web applications using TypeScript and frontend frameworks, managing global states, documenting UI components and unit testing them. Expert using CSS frameworks and UI component libraries. Advanced knowledge of best practices, programming principles, object-oriented, reactive and functional programming, design patterns and atomic design.';

  constructor() {
    this.pageService.setMetaTags(this.DESCRIPTION);
  }

  public setFilteredProjects(projects: readonly Project[]): void {
    this.filteredProjects.set(projects);
  }

  public setSort(sort: ProjectSort): void {
    this.sort.set(sort);
  }

  public openFilterDialog(): void {
    this.isFilterDialogOpen.set(true);
  }

  public closeFilterDialog(): void {
    this.isFilterDialogOpen.set(false);
  }
}
