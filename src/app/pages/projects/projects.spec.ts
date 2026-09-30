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

  it('should sort projects alphabetically by default', () => {
    const titles = component.displayedProjects().map((project) => project.title);

    expect(titles).toEqual(
      [...titles].sort((first, second) =>
        first.localeCompare(second, undefined, { sensitivity: 'base' }),
      ),
    );
  });

  it('should sort projects by descending year', () => {
    component.setSort('year');

    const years = component
      .displayedProjects()
      .flatMap((project) => (project.year === undefined ? [] : [project.year]));

    expect(years).toEqual([...years].sort((first, second) => second - first));
  });

  it('should show the remaining project catalog', () => {
    expect(component.projects).toHaveLength(32);
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
});
