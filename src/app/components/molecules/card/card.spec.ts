import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Project } from '@services/projects/projects-data';

import { Card } from './card';

const PROJECT: Project = {
  slug: 'test-project',
  title: 'Test Project',
  image: '/projects/test-project.webp',
  imageBackgroundColor: '#ffffff',
  rol: 'author',
  description: 'A project used to verify the shared project card.',
  technologies: ['Angular', 'TypeScript', 'CSS', 'HTML', 'Testing'],
  year: 2026,
  sourceCode: 'https://github.com/example/test-project',
  content: 'Test project content.',
};

describe('Card', () => {
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    fixture.componentRef.setInput('project', PROJECT);
    fixture.detectChanges();
  });

  it('should link to project details and source code when available', () => {
    const element: HTMLElement = fixture.nativeElement;
    const imageLink: HTMLAnchorElement | null = element.querySelector(
      '.projects__card-image-container',
    );
    const detailsLink: HTMLAnchorElement | null = element.querySelector(
      '.projects__card-link:not([target])',
    );
    const sourceLink: HTMLAnchorElement | null = element.querySelector(
      '.projects__card-link[target="_blank"]',
    );

    expect(imageLink?.getAttribute('href')).toBe('/projects/test-project');
    expect(imageLink?.getAttribute('aria-label')).toBeNull();
    expect(imageLink?.querySelector('img')?.getAttribute('alt')).toBe(PROJECT.title);
    expect(detailsLink?.getAttribute('href')).toBe('/projects/test-project');
    expect(sourceLink?.getAttribute('href')).toBe(PROJECT.sourceCode);
    expect(sourceLink?.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
