import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    });

    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('dialog--open');
    vi.unstubAllGlobals();
  });

  it('should sort projects by title ascending and descending', () => {
    component.setSort('Title (A–Z)');
    const ascendingTitles = component.displayedProjects().map((project) => project.title);
    const expectedAscending = [...ascendingTitles].sort((first, second) =>
      first.localeCompare(second, undefined, { sensitivity: 'base' }),
    );
    expect(ascendingTitles).toEqual(expectedAscending);
    expect(ascendingTitles[0]).toBe('Adresles');

    component.setSort('Title (Z–A)');
    const descendingTitles = component.displayedProjects().map((project) => project.title);
    const expectedDescending = [...descendingTitles].sort((first, second) =>
      second.localeCompare(first, undefined, { sensitivity: 'base' }),
    );
    expect(descendingTitles).toEqual(expectedDescending);
    expect(descendingTitles[0]).toBe('Wompi');
  });

  it('should sort projects by year newest first and oldest first with undefined years last', () => {
    component.setSort('Year (newest first)');
    const newestProjects = component.displayedProjects();
    const newestWithYear = newestProjects
      .filter((project) => project.year !== undefined)
      .map((project) => project.year as number);
    const newestWithoutYear = newestProjects.filter((project) => project.year === undefined);

    expect(newestWithYear).toEqual([...newestWithYear].sort((first, second) => second - first));
    expect(newestProjects.slice(newestWithYear.length)).toEqual(newestWithoutYear);

    component.setSort('Year (oldest first)');
    const oldestProjects = component.displayedProjects();
    const oldestWithYear = oldestProjects
      .filter((project) => project.year !== undefined)
      .map((project) => project.year as number);
    const oldestWithoutYear = oldestProjects.filter((project) => project.year === undefined);

    expect(oldestWithYear).toEqual([...oldestWithYear].sort((first, second) => first - second));
    expect(oldestProjects.slice(oldestWithYear.length)).toEqual(oldestWithoutYear);
  });

  it('should render a details link and a source link only when source code is available', () => {
    const cards: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.projects__card');

    component.projects.slice(0, cards.length).forEach((project, index) => {
      const card: HTMLElement = cards[index];
      const detailsLink: HTMLAnchorElement | null = card.querySelector(
        '.projects__card-link:not([target])',
      );
      const sourceLink: HTMLAnchorElement | null = card.querySelector(
        '.projects__card-link[target="_blank"]',
      );

      expect(detailsLink?.getAttribute('href')).toBe(`/projects/${project.slug}`);
      expect(detailsLink?.textContent).toContain('Details');
      expect(sourceLink !== null).toBe(Boolean(project.sourceCode));
      expect(sourceLink ? sourceLink.getAttribute('href') : null).toBe(project.sourceCode ?? null);
      expect(sourceLink?.getAttribute('rel')).toBe(
        project.sourceCode ? 'noopener noreferrer' : undefined,
      );
    });
  });

  it('should display six projects per page and navigate between pages', () => {
    expect(fixture.nativeElement.querySelectorAll('.projects__card')).toHaveLength(6);
    expect(fixture.nativeElement.querySelectorAll('.pagination__control')).toHaveLength(
      Math.min(5, Math.ceil(component.projects.length / 6)) + 2,
    );

    fixture.nativeElement.querySelector('.pagination__control[aria-label="Next page"]').click();
    fixture.detectChanges();

    expect(component.page()).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.projects__card')).toHaveLength(6);
    expect(fixture.nativeElement.querySelector('.projects__card-title')).not.toBeNull();
  });

  it('should reset pagination after sorting or filtering projects', () => {
    component.setPage(3);
    component.setSort('Title (A–Z)');
    expect(component.page()).toBe(1);

    component.setPage(3);
    component.setFilteredProjects(component.projects.slice(0, 5));
    expect(component.page()).toBe(1);
  });

  it('should reset filters from the empty-state action', () => {
    component.setSort('Title (A–Z)');
    component.setFilteredProjects([]);
    component.openFilterDialog();
    fixture.detectChanges();

    const emptyActionButton = fixture.nativeElement.querySelector('.projects__empty-action');
    expect(emptyActionButton).toBeTruthy();

    emptyActionButton.click();
    fixture.detectChanges();

    expect(component.filteredProjects()).toEqual(component.projects);
    expect(component.sort()).toBe('Relevance');
    expect(component.page()).toBe(1);
    expect(component.isFilterDialogOpen()).toBe(false);
  });

  it('should close the filter dialog when filters are cleared', async () => {
    component.openFilterDialog();
    fixture.detectChanges();

    const clearFiltersButton = fixture.nativeElement.querySelector(
      '.filter app-button button',
    ) as HTMLButtonElement;
    expect(clearFiltersButton).toBeTruthy();

    clearFiltersButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.filteredProjects()).toEqual(component.projects);
    expect(component.isFilterDialogOpen()).toBe(false);
    expect(document.activeElement).toBe(
      fixture.nativeElement.querySelector('.projects__filter-trigger'),
    );
  });

  it('should apply selected filters and close the dialog from the Filter button', async () => {
    component.openFilterDialog();
    fixture.detectChanges();

    const technologyCheckbox = fixture.nativeElement.querySelector(
      '.filter__checkbox',
    ) as HTMLInputElement;
    technologyCheckbox.click();
    fixture.detectChanges();

    const filteredProjects = component.filteredProjects();
    const filterButton = fixture.nativeElement.querySelector(
      '.filter app-button button.button--primary',
    ) as HTMLButtonElement;
    filterButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(filteredProjects.length).toBeLessThan(component.projects.length);
    expect(component.filteredProjects()).toEqual(filteredProjects);
    expect(component.isFilterDialogOpen()).toBe(false);
  });

  it('should open and close the project filter dialog with focus management', async () => {
    const trigger = fixture.nativeElement.querySelector(
      '.projects__filter-trigger',
    ) as HTMLButtonElement;
    expect(trigger.getAttribute('aria-controls')).toBe(component.filterPanelId);

    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = fixture.nativeElement.querySelector(
      `#${component.filterPanelId}`,
    ) as HTMLElement | null;
    const heading = panel?.querySelector('#projects-filter-heading') as HTMLElement | null;

    expect(component.isFilterDialogOpen()).toBe(true);
    expect(document.body.classList.contains('dialog--open')).toBe(true);
    expect(panel).toBeTruthy();
    expect(panel?.getAttribute('role')).toBe('dialog');
    expect(heading?.textContent?.trim()).toBe('Project filters');
    expect(document.activeElement).toBe(panel);

    panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.isFilterDialogOpen()).toBe(false);
    expect(document.activeElement).toBe(trigger);

    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const backdrop = fixture.nativeElement.querySelector('.dialog__backdrop');
    backdrop?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.isFilterDialogOpen()).toBe(false);
    expect(document.body.classList.contains('dialog--open')).toBe(false);
  });
});
