import { Component, DestroyRef, ElementRef, computed, effect, inject, signal } from '@angular/core';
import { Card } from '@components/molecules/card/card';
import { Filter, FilterCategory } from '@components/molecules/filter/filter';
import { Pagination } from '@components/molecules/pagination/pagination';
import { Layout } from '@components/templates/layout/layout';
import { Page } from '@services/page/page';
import { Project, ProjectsData } from '@services/projects/projects-data';

export type ProjectSort =
  'Relevance' | 'Title (A–Z)' | 'Title (Z–A)' | 'Year (newest first)' | 'Year (oldest first)';

type ProjectSortStrategy = (first: Project, second: Project) => number;

const RELEVANCE_ORDER: readonly string[] = [
  'Emmanuel Mendez Website',
  'Astyimar y Emmanuel',
  'Coca Cola',
  'Toyota',
  'Shell',
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
  'Grupo Uno',
  'Expovinos 2021',
  'Foodbox',
  'Chillibeans',
  'Alpina',
  'Ultra1Plus',
  'Especialistas En Casa',
  'Planetife',
  'Geekboss',
  'Dra Skin',
  'Adresles',
  'Dosmass',
  'Destiny',
  'Dojo',
  'Cimonamía',
  'Highpeak',
  'Grateful',
  'Q Buen Plan',
  'M374',
];

const compareTitleAscending: ProjectSortStrategy = (first, second) =>
  first.title.localeCompare(second.title, undefined, { sensitivity: 'base' });

const compareTitleDescending: ProjectSortStrategy = (first, second) =>
  second.title.localeCompare(first.title, undefined, { sensitivity: 'base' });

const compareYearNewestFirst: ProjectSortStrategy = (first, second) => {
  if (first.year === undefined && second.year === undefined) {
    return compareTitleAscending(first, second);
  }

  if (first.year === undefined) {
    return 1;
  }

  if (second.year === undefined) {
    return -1;
  }

  return second.year - first.year || compareTitleAscending(first, second);
};

const compareYearOldestFirst: ProjectSortStrategy = (first, second) => {
  if (first.year === undefined && second.year === undefined) {
    return compareTitleAscending(first, second);
  }

  if (first.year === undefined) {
    return 1;
  }

  if (second.year === undefined) {
    return -1;
  }

  return first.year - second.year || compareTitleAscending(first, second);
};

const compareRelevance: ProjectSortStrategy = (first, second) => {
  const ownerOrder = Number(second.rol === 'owner') - Number(first.rol === 'owner');
  if (ownerOrder !== 0) {
    return ownerOrder;
  }

  const firstRelevance = RELEVANCE_ORDER.indexOf(first.title);
  const secondRelevance = RELEVANCE_ORDER.indexOf(second.title);
  const normalizedFirst = firstRelevance < 0 ? RELEVANCE_ORDER.length : firstRelevance;
  const normalizedSecond = secondRelevance < 0 ? RELEVANCE_ORDER.length : secondRelevance;
  const relevanceOrder = normalizedFirst - normalizedSecond;

  return relevanceOrder || compareTitleAscending(first, second);
};

const SORT_STRATEGIES: Readonly<Record<ProjectSort, ProjectSortStrategy>> = {
  Relevance: compareRelevance,
  'Title (A–Z)': compareTitleAscending,
  'Title (Z–A)': compareTitleDescending,
  'Year (newest first)': compareYearNewestFirst,
  'Year (oldest first)': compareYearOldestFirst,
};

const SORT_ALIASES: Readonly<Record<string, ProjectSort>> = {
  Alphabetically: 'Title (A–Z)',
  Year: 'Year (newest first)',
};

const FILTER_DIALOG_OPEN_CLASS = 'projects--filter-dialog-open';
const FILTER_TRIGGER_SELECTOR = '.projects__filter-trigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [Layout, Card, Filter, Pagination],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private readonly destroyRef = inject(DestroyRef);
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly pageService = inject(Page);
  private readonly projectsData = inject(ProjectsData);

  public readonly projects = this.projectsData.projects;
  public readonly filterPanelId = 'projects-filter-panel';
  public readonly sortProperties: readonly ProjectSort[] = [
    'Relevance',
    'Title (A–Z)',
    'Title (Z–A)',
    'Year (newest first)',
    'Year (oldest first)',
  ];
  public readonly filteredProjects = signal<readonly Project[]>(this.projects);
  public readonly sort = signal<ProjectSort>('Relevance');
  public readonly page = signal(1);
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
    const strategy = SORT_STRATEGIES[this.sort()] ?? SORT_STRATEGIES.Relevance;
    return [...this.filteredProjects()].sort(strategy);
  });
  public readonly resultsSummary = computed(() => {
    const totalProjects = this.displayedProjects().length;
    const label = totalProjects === 1 ? 'project' : 'projects';

    return `${totalProjects} ${label} shown. Sorted by ${this.sort()}.`;
  });

  private readonly DESCRIPTION =
    'Projects - Emmanuel Mendez / +3 years of experience creating web applications using TypeScript and frontend frameworks, managing global states, documenting UI components and unit testing them. Expert using CSS frameworks and UI component libraries. Advanced knowledge of best practices, programming principles, object-oriented, reactive and functional programming, design patterns and atomic design.';

  constructor() {
    this.pageService.setMetaTags(this.DESCRIPTION);

    effect(() => {
      if (typeof document === 'undefined') return;
      document.body.classList.toggle(FILTER_DIALOG_OPEN_CLASS, this.isFilterDialogOpen());
    });

    this.destroyRef.onDestroy(() => {
      if (typeof document === 'undefined') return;
      document.body.classList.remove(FILTER_DIALOG_OPEN_CLASS);
    });
  }

  public setFilteredProjects(projects: readonly Project[]): void {
    this.filteredProjects.set(projects);
    this.page.set(1);
  }

  public setSort(sort: string): void {
    const resolvedSort = (SORT_ALIASES[sort] ?? sort) as ProjectSort;
    if (!this.sortProperties.includes(resolvedSort)) {
      return;
    }

    this.sort.set(resolvedSort);
    this.page.set(1);
  }

  public setPage(page: number): void {
    this.page.set(page);
  }

  public openFilterDialog(): void {
    if (this.isFilterDialogOpen()) {
      return;
    }

    this.isFilterDialogOpen.set(true);
    this.focusFilterPanel();
  }

  public closeFilterDialog(): void {
    if (this.isFilterDialogOpen() === false) {
      return;
    }

    this.isFilterDialogOpen.set(false);
    this.focusFilterTrigger();
  }

  private focusFilterPanel(): void {
    queueMicrotask(() => {
      this.hostElement.nativeElement.querySelector<HTMLElement>(`#${this.filterPanelId}`)?.focus();
    });
  }

  private focusFilterTrigger(): void {
    queueMicrotask(() => {
      this.hostElement.nativeElement
        .querySelector<HTMLButtonElement>(FILTER_TRIGGER_SELECTOR)
        ?.focus();
    });
  }

  public resetFilters(): void {
    this.filteredProjects.set(this.projects);
    this.sort.set('Relevance');
    this.page.set(1);
    this.closeFilterDialog();
  }
}
