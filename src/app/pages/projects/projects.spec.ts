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
      'Dojo',
    ]);
  });

  it('should sort projects alphabetically with the owner first', () => {
    component.setSort('Alphabetically');
    const titles = component.displayedProjects().map((project) => project.title);
    const collaboratorTitles = titles.slice(1);

    expect(titles[0]).toBe('Emmanuel Mendez Website');
    expect(collaboratorTitles).toEqual(
      [...collaboratorTitles].sort((first, second) =>
        first.localeCompare(second, undefined, { sensitivity: 'base' }),
      ),
    );
  });

  it('should support both title sort directions while keeping the owner first', () => {
    component.setSort('Title (A–Z)');
    const ascendingTitles = component.displayedProjects().map((project) => project.title);
    component.setSort('Title (Z–A)');
    const descendingTitles = component.displayedProjects().map((project) => project.title);

    expect(ascendingTitles[0]).toBe('Emmanuel Mendez Website');
    expect(descendingTitles[0]).toBe('Emmanuel Mendez Website');
    expect(descendingTitles.slice(1)).toEqual(ascendingTitles.slice(1).reverse());
  });

  it('should sort collaborator projects by year in either direction', () => {
    component.setSort('Year (newest first)');
    const newestFirstYears = component
      .displayedProjects()
      .slice(1)
      .map((project) => project.year ?? 0);
    component.setSort('Year (oldest first)');
    const oldestFirstYears = component
      .displayedProjects()
      .slice(1)
      .map((project) => project.year ?? 0);

    expect(newestFirstYears).toEqual([...newestFirstYears].sort((first, second) => second - first));
    expect(oldestFirstYears).toEqual([...oldestFirstYears].sort((first, second) => first - second));
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

  it('should show the complete project catalog with the owner first', () => {
    expect(component.projects).toHaveLength(39);
    expect(component.projects[0].rol).toBe('owner');
    expect(component.projects.slice(1).every((project) => project.rol === 'collaborator')).toBe(
      true,
    );
  });

  it('should render project roles and hide unavailable years', () => {
    const cards = fixture.nativeElement.querySelectorAll('.projects__card');
    const firstCard = cards[0] as HTMLElement;
    const yearLabels = fixture.nativeElement.querySelectorAll('.projects__card-year');

    expect(firstCard.querySelector('.projects__card-role')?.textContent.trim()).toBe('owner');
    expect(yearLabels.length).toBe(1);
    expect(cards[1].querySelector('.projects__card-role')?.textContent.trim()).toBe('collaborator');
  });

  it('should display nine projects per page and navigate between pages', () => {
    expect(fixture.nativeElement.querySelectorAll('.projects__card')).toHaveLength(9);
    expect(fixture.nativeElement.querySelectorAll('.pagination__control')).toHaveLength(7);

    fixture.nativeElement.querySelector('.pagination__control:last-child').click();
    fixture.detectChanges();

    expect(component.page()).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.projects__card')).toHaveLength(9);
    expect(fixture.nativeElement.querySelector('.projects__card-title').textContent.trim()).toBe(
      'Grupo Diana',
    );
  });

  it('should reset pagination after sorting or filtering projects', () => {
    component.setPage(3);
    component.setSort('Year');
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
