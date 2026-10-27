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

  it('should render the visible project cards and their key links', () => {
    const cards: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.projects__card');
    expect(cards).toHaveLength(3);

    component.projects.slice(0, 3).forEach((project, index) => {
      const card: HTMLElement = cards[index];
      const sourceLink: HTMLAnchorElement | null = card.querySelector(
        '.projects__card-link[target="_blank"]',
      );

      expect(card.querySelector('.projects__card-link:not([target])')).not.toBeNull();
      expect(sourceLink !== null).toBe(Boolean(project.sourceCode));
    });

    const button = fixture.nativeElement.querySelector('app-button a');
    expect(button).not.toBeNull();
    expect(button.hasAttribute('href')).toBe(true);
  });
});
