import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort projects by relevance by default', () => {
    const titles = component.displayedProjects().map((project) => project.title);

    expect(titles).toEqual([
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
    ]);
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

  it('should render all sorting choices in the filter', () => {
    const options = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('#filter-sort option'),
    ).map((option) => (option as HTMLOptionElement).value);

    expect(options).toEqual([
      'Relevance',
      'Title (A–Z)',
      'Title (Z–A)',
      'Year (newest first)',
      'Year (oldest first)',
    ]);
  });

  it('should show the complete project catalog with valid roles', () => {
    expect(component.projects).toHaveLength(34);
    expect(component.projects.filter((project) => project.rol === 'owner')).toHaveLength(2);
    expect(component.projects.filter((project) => project.rol === 'collaborator')).toHaveLength(32);
  });

  it('should render project roles and hide unavailable years', () => {
    const cards = fixture.nativeElement.querySelectorAll('.projects__card');
    const firstCard = cards[0] as HTMLElement;
    const yearLabels = fixture.nativeElement.querySelectorAll('.projects__card-year');

    expect(firstCard.querySelector('.projects__card-role')?.textContent.trim()).toBe('owner');
    expect(yearLabels.length).toBe(3);
    expect(cards[2].querySelector('.projects__card-role')?.textContent.trim()).toBe('collaborator');
  });

  it('should display six projects per page and navigate between pages', () => {
    expect(fixture.nativeElement.querySelectorAll('.projects__card')).toHaveLength(6);
    expect(fixture.nativeElement.querySelectorAll('.pagination__control')).toHaveLength(8);

    fixture.nativeElement.querySelector('.pagination__control:last-child').click();
    fixture.detectChanges();

    expect(component.page()).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.projects__card')).toHaveLength(6);
    expect(fixture.nativeElement.querySelector('.projects__card-title').textContent.trim()).toBe(
      'Castrol',
    );
  });

  it('should reset pagination after sorting or filtering projects', () => {
    component.setPage(3);
    component.setSort('Title (A–Z)');
    expect(component.page()).toBe(1);

    component.setPage(3);
    component.setFilteredProjects(component.projects.slice(0, 5));
    expect(component.page()).toBe(1);
  });

  it('should open and close the project filter dialog', () => {
    component.openFilterDialog();
    expect(component.isFilterDialogOpen()).toBe(true);

    component.closeFilterDialog();
    expect(component.isFilterDialogOpen()).toBe(false);
  });
});
