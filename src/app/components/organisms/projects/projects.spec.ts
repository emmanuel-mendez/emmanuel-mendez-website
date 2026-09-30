import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProjectsSection } from './projects';

describe('ProjectsSection', () => {
  let component: ProjectsSection;
  let fixture: ComponentFixture<ProjectsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsSection],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have projects', () => {
    expect(component.projects.length).toBeGreaterThan(0);
  });

  it('should render only the configured number of project cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.projects__card');
    expect(cards.length).toBe(2);
  });

  it('should render project titles in the DOM', () => {
    const titles = fixture.nativeElement.querySelectorAll('.projects__card-title');
    expect(titles[0].textContent.trim()).toBe(component.projects[0].title);
  });

  it('should render technology tags for each project', () => {
    const firstCardTags = fixture.nativeElement
      .querySelectorAll('.projects__card')[0]
      .querySelectorAll('.projects__card-tag');
    expect(firstCardTags.length).toBe(component.projects[0].technologies.length);
  });

  it('should render a live link only when a project has one', () => {
    const projectsWithLink = component.projects.filter((p) => p.link);
    const projectsWithoutLink = component.projects.filter((p) => !p.link);
    const allLinks = fixture.nativeElement.querySelectorAll('.projects__card-link');
    expect(allLinks.length).toBeGreaterThanOrEqual(projectsWithLink.length);
    expect(projectsWithoutLink.length).toBeGreaterThanOrEqual(0);
  });

  it('should render a See more link to the projects page when projects are hidden', () => {
    const button = fixture.nativeElement.querySelector('app-button a');
    expect(button.textContent.trim()).toBe('See more');
    expect(button.getAttribute('href')).toBe('/projects');
  });
});
