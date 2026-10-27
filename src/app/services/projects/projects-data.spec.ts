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
});
