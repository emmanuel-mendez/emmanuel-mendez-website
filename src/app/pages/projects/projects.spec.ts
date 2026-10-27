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

  it('should sort projects by relevance by default', () => {
    const displayedProjects = component.displayedProjects();

    expect(displayedProjects).toHaveLength(component.projects.length);
    expect(new Set(displayedProjects)).toEqual(new Set(component.projects));
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

  it('should render project roles and hide unavailable years', () => {
    const cards = fixture.nativeElement.querySelectorAll('.projects__card');
    const firstCard = cards[0] as HTMLElement;
    const yearLabels = fixture.nativeElement.querySelectorAll('.projects__card-year');

    expect(firstCard.querySelector('.projects__card-role')).not.toBeNull();
    expect(
      firstCard
        .querySelector('.projects__card-image-container')
        ?.contains(firstCard.querySelector('.projects__card-role')),
    ).toBe(true);
    expect(yearLabels.length).toBe(3);
    expect(cards[2].querySelector('.projects__card-role')).not.toBeNull();
    expect(firstCard.querySelector('.projects__card-role--owner')).not.toBeNull();
    expect(cards[2].querySelector('.projects__card-role--collaborator')).not.toBeNull();
  });

  it('should display six projects per page and navigate between pages', () => {
    expect(fixture.nativeElement.querySelectorAll('.projects__card')).toHaveLength(6);
    expect(fixture.nativeElement.querySelectorAll('.pagination__control')).toHaveLength(8);

    fixture.nativeElement.querySelector('.pagination__control:last-child').click();
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

  it('should open and close the project filter dialog', () => {
    component.openFilterDialog();
    expect(component.isFilterDialogOpen()).toBe(true);

    component.closeFilterDialog();
    expect(component.isFilterDialogOpen()).toBe(false);
  });
});
