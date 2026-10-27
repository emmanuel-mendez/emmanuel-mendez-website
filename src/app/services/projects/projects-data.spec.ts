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

  it('should describe the Astyimar and Emmanuel wedding project', () => {
    const project = service.getBySlug('astyimar-y-emmanuel');

    expect(project?.slug).toBe('astyimar-y-emmanuel');
    expect(project?.title).toBe('Astyimar y Emmanuel');
    expect(project?.image).toBe('/projects/astyimar-y-emmanuel.png');
    expect(project?.imageBackgroundColor).toBe('#6d578f');
    expect(project?.rol).toBe('author');
    expect(project?.description).toContain('Wedding invitation');
    expect(project?.technologies).toEqual(['Astro', 'Preact', 'TypeScript', 'CSS', 'Cloudflare']);
    expect(project?.year).toBe(2025);
    expect(project?.timeline).toBeTruthy();
    expect(project?.scope).toBeTruthy();
    expect(project?.products).toContain('Website');
    expect(project?.modules).toContain('Personalized guest invitations');
    expect(project?.responsibilities?.length).toBeGreaterThan(0);
    expect(project?.highlights?.length).toBeGreaterThan(0);
    expect(project?.highlights?.[0]).toEqual({
      metric: expect.any(String),
      value: expect.any(String),
      context: expect.any(String),
    });
    expect(project?.milestones?.length).toBeGreaterThan(0);
    expect(project?.milestones?.[0]).toEqual({
      title: expect.any(String),
      detail: expect.any(String),
    });
    expect(project?.link).toBe('https://astyimar-y-emmanuel.com');
    expect(project?.sourceCode).toBe(
      'https://github.com/emmanuel-mendez/astyimar-emmanuel-wedding',
    );
    expect(project?.content).toContain('wedding invitation website');
  });
});
