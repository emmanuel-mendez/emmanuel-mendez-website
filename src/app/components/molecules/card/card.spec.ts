import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Project } from '@services/projects/projects-data';

import { Card } from './card';

const PROJECT: Project = {
  slug: 'test-project',
  title: 'Test Project',
  image: '/projects/test-project.webp',
  imageBackgroundColor: '#ffffff',
  rol: 'owner',
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

  it('should render project information, role, and up to four technology tags', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.projects__card-title')?.textContent).toContain(PROJECT.title);
    expect(element.querySelector('.projects__card-description')?.textContent).toContain(
      PROJECT.description,
    );
    expect(element.querySelector('.projects__card-image')?.getAttribute('src')).toBe(PROJECT.image);
    expect(element.querySelector('.projects__card-role--owner')?.textContent).toContain('owner');
    expect(element.querySelectorAll('.projects__card-tag')).toHaveLength(4);
    expect(element.querySelector('.projects__card-year')?.textContent).toContain('2026');
  });

  it('should link to project details and source code when available', () => {
    const element: HTMLElement = fixture.nativeElement;
    const detailsLink: HTMLAnchorElement | null = element.querySelector(
      '.projects__card-link:not([target])',
    );
    const sourceLink: HTMLAnchorElement | null = element.querySelector(
      '.projects__card-link[target="_blank"]',
    );

    expect(detailsLink?.getAttribute('href')).toBe('/projects/test-project');
    expect(sourceLink?.getAttribute('href')).toBe(PROJECT.sourceCode);
    expect(sourceLink?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should render the requested heading level and omit unavailable project data', () => {
    fixture.componentRef.setInput('titleLevel', 3);
    fixture.componentRef.setInput('project', {
      ...PROJECT,
      rol: 'collaborator',
      year: undefined,
      sourceCode: undefined,
    });
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h3.projects__card-title')).not.toBeNull();
    expect(element.querySelector('.projects__card-role--collaborator')).not.toBeNull();
    expect(element.querySelector('.projects__card-year')).toBeNull();
    expect(element.querySelector('.projects__card-link[target="_blank"]')).toBeNull();
  });
});
