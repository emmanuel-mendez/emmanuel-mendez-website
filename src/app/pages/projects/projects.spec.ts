import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      // 2. Add the provider here
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

  it('should sort projects by descending year', () => {
    component.setSort('Year');

    const years = component
      .displayedProjects()
      .flatMap((project) => (project.year === undefined ? [] : [project.year]));

    expect(years).toEqual([...years].sort((first, second) => second - first));
  });

  it('should sort projects alphabetically when requested', () => {
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

  it('should show the remaining project catalog', () => {
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
});
