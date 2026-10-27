import { TestBed } from '@angular/core/testing';
import { ProjectsData } from './projects-data';

describe('ProjectsData', () => {
  let service: ProjectsData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsData);
  });

  it('should resolve a project by slug and return undefined for an unknown slug', () => {
    const project = service.getBySlug('emmanuel-mendez-website');
    expect(project).toBeTruthy();
    expect(service.getBySlug('nonexistent')).toBeUndefined();
  });

  it('should provide extended project detail data for the redesigned flagship case study', () => {
    const project = service.getBySlug('emmanuel-mendez-website');

    expect(project?.timeline).toBeTruthy();
    expect(project?.scope).toBeTruthy();
    expect(project?.responsibilities?.length).toBeGreaterThan(0);
    expect(project?.highlights?.length).toBeGreaterThan(0);
    expect(project?.milestones?.length).toBeGreaterThan(0);
  });
});
