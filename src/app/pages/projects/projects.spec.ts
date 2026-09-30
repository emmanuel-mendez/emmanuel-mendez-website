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

  it('should sort projects by title ascending by default', () => {
    const titles = component.displayedProjects().map((project) => project.title);

    expect(titles).toEqual(
      [...titles].sort((first, second) =>
        first.localeCompare(second, undefined, { sensitivity: 'base' }),
      ),
    );
  });

  it('should sort projects by title descending', () => {
    component.setSort('title-descending');

    const titles = component.displayedProjects().map((project) => project.title);

    expect(titles).toEqual(
      [...titles].sort((first, second) =>
        second.localeCompare(first, undefined, { sensitivity: 'base' }),
      ),
    );
  });

  it('should sort projects by ascending year', () => {
    component.setSort('year-ascending');

    const years = component.displayedProjects().map((project) => project.year);

    expect(years).toEqual([...years].sort((first, second) => first - second));
  });

  it('should sort projects by descending year', () => {
    component.setSort('year-descending');

    const years = component.displayedProjects().map((project) => project.year);

    expect(years).toEqual([...years].sort((first, second) => second - first));
  });

  it('should render all sort directions in the dropdown', () => {
    fixture.detectChanges();
    const options = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('#projects-sort option'),
    ).map((option) => (option as HTMLOptionElement).value);

    expect(options).toEqual([
      'title-ascending',
      'title-descending',
      'year-descending',
      'year-ascending',
    ]);
  });

  it('should show the remaining project catalog', () => {
    expect(component.projects.map((project) => project.title)).toEqual(['Emmanuel Mendez Website']);
  });

  it('should open and close the project filter dialog', () => {
    component.openFilterDialog();
    expect(component.isFilterDialogOpen()).toBe(true);

    component.closeFilterDialog();
    expect(component.isFilterDialogOpen()).toBe(false);
  });
});
