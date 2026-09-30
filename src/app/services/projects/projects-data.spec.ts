import { TestBed } from '@angular/core/testing';
import { ProjectsData } from './projects-data';

describe('ProjectsData', () => {
  let service: ProjectsData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all projects', () => {
    expect(service.projects.length).toBeGreaterThan(0);
  });

  it('should assign each project an allowed role', () => {
    expect(
      service.projects.every((project) => ['owner', 'collaborator'].includes(project.rol)),
    ).toBe(true);
    expect(service.getBySlug('emmanuel-mendez-website')?.rol).toBe('owner');
  });

  it('should find project by slug', () => {
    const project = service.getBySlug('emmanuel-mendez-website');
    expect(project).toBeTruthy();
    expect(project?.title).toBe('Emmanuel Mendez Website');
  });

  it('should return undefined for unknown slug', () => {
    expect(service.getBySlug('nonexistent')).toBeUndefined();
  });
});
