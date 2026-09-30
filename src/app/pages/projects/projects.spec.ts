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

    const years = component.displayedProjects().map((project) => project.year);

    expect(years).toEqual([...years].sort((first, second) => second - first));
  });

  it('should render the mock projects', () => {
    expect(component.projects.length).toBeGreaterThan(3);
  });

  it('should render each project role', () => {
    const roles = fixture.nativeElement.querySelectorAll<HTMLElement>('.projects__card-rol');

    expect(roles.length).toBe(component.displayedProjects().length);
    expect(Array.from(roles).some((role) => role.textContent?.trim() === 'Role: owner')).toBe(true);
  });
});
