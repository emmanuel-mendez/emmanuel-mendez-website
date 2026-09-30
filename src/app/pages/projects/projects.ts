import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Filter, FilterCategory } from '@components/molecules/filter/filter';
import { Layout } from '@components/templates/layout/layout';
import { Page } from '@services/page/page';
import { Project, ProjectsData } from '@services/projects/projects-data';

type ProjectSort = 'Relevance' | 'Alphabetically' | 'Year';

const SORT_PROPERTIES: Readonly<Record<string, ProjectSort>> = {
  Relevance: 'Relevance',
  Alphabetically: 'Alphabetically',
  Year: 'Year',
};

const RELEVANCE_ORDER: readonly string[] = [
  'Emmanuel Mendez Website',
  'Coca Cola',
  'Toyota',
  'Shell GT',
  'Mars',
  'Castrol',
  'Bancolombia',
  'Rappi',
  'Colombina',
  'Grupo Diana',
  'Wompi',
  'Banistmo',
  'Grupo Alen',
  'Comfaboy',
  'Grupo Uno Nicaragua',
  'Grupo Uno Honduras',
  'Expovinos 2021',
  'Foodbox',
  'Chillibean',
  'Alpina Quinquenios',
  'Ultra1Plus',
  'Rappi Redención',
  'Rappi Defensoría',
  'Rappi Mochilas',
  'Blog Rappitenderos',
  'Toyota Totem',
  'Highpeak',
  'Grateful',
  'Especialistas En Casa',
  'Q Buen Plan',
  'Geekboss',
  'Dra Skin',
  'Planetife',
  'Agro Platform',
  'Destiny Website',
  'Dosmass',
  'Adresles',
  'M374 Meta',
];

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
  public readonly sortProperties: readonly ProjectSort[] = ['Relevance', 'Alphabetically', 'Year'];
  public readonly filteredProjects = signal<readonly Project[]>(this.projects);
  public readonly sort = signal<ProjectSort>('Relevance');
  public readonly categories = computed<readonly FilterCategory<Project>[]>(() => [
    {
      name: 'Technology',
      property: 'technologies',
      properties: [...new Set(this.projects.flatMap((project) => project.technologies))].sort(),
    },
    {
      name: 'Year',
      property: 'year',
      properties: [
        ...new Set(
          this.projects.flatMap((project) =>
            project.year === undefined ? [] : [String(project.year)],
          ),
        ),
      ].sort((first, second) => Number(second) - Number(first)),
    },
  ]);
  public readonly displayedProjects = computed(() => {
    const titleOrder = (first: Project, second: Project): number =>
      first.title.localeCompare(second.title, undefined, { sensitivity: 'base' });

    return [...this.filteredProjects()].sort((first, second) => {
      const ownerOrder = Number(second.rol === 'owner') - Number(first.rol === 'owner');
      if (ownerOrder !== 0) {
        return ownerOrder;
      }

      const sortProperty = this.sort();
      if (sortProperty === 'Alphabetically') {
        return titleOrder(first, second);
      }

      if (sortProperty === 'Year') {
        return (second.year ?? 0) - (first.year ?? 0) || titleOrder(first, second);
      }

      const firstRelevance = RELEVANCE_ORDER.indexOf(first.title);
      const secondRelevance = RELEVANCE_ORDER.indexOf(second.title);
      const relevanceOrder =
        (firstRelevance < 0 ? RELEVANCE_ORDER.length : firstRelevance) -
        (secondRelevance < 0 ? RELEVANCE_ORDER.length : secondRelevance);

      return relevanceOrder || titleOrder(first, second);
    });
  });

  private readonly DESCRIPTION =
    'Projects - Emmanuel Mendez / +3 years of experience creating web applications using TypeScript and frontend frameworks, managing global states, documenting UI components and unit testing them. Expert using CSS frameworks and UI component libraries. Advanced knowledge of best practices, programming principles, object-oriented, reactive and functional programming, design patterns and atomic design.';

  constructor() {
    this.pageService.setMetaTags(this.DESCRIPTION);
  }

  public setFilteredProjects(projects: readonly Project[]): void {
    this.filteredProjects.set(projects);
  }

  public setSort(sort: string): void {
    this.sort.set(SORT_PROPERTIES[sort] ?? 'Relevance');
  }
}
