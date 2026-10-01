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

  it('should find project by slug', () => {
    const project = service.getBySlug('emmanuel-mendez-website');
    expect(project).toBeTruthy();
    expect(project?.title).toBe('Emmanuel Mendez Website');
    expect(project?.rol).toBe('owner');
  });

  it('should assign a valid role to every project', () => {
    expect(service.projects.every(({ rol }) => ['owner', 'collaborator'].includes(rol))).toBe(true);
    expect(service.projects.filter(({ rol }) => rol === 'owner')).toHaveLength(2);
  });

  it('should include all collaborator projects with their supplied details', () => {
    const titles = service.projects.map(({ title }) => title);
    expect(titles).toEqual(
      expect.arrayContaining([
        'Coca Cola',
        'Toyota',
        'Shell',
        'Mars',
        'Castrol',
        'Bancolombia',
        'Rappi',
        'Colombina',
        'Grupo Diana',
        'Wompi',
        'Banistmo',
        'Grupo Alen',
        'Comfaboy',
        'Grupo Uno',
        'Expovinos 2021',
        'Foodbox',
        'Chillibeans',
        'Alpina',
        'Ultra1Plus',
        'Dojo',
        'Highpeak',
        'Grateful',
        'Especialistas En Casa',
        'Q Buen Plan',
        'Geekboss',
        'Dra Skin',
        'Cimonamía',
        'Planetife',
        'Destiny',
        'Dosmass',
        'Adresles',
        'M374',
      ]),
    );
  });

  it('should return undefined for unknown slug', () => {
    expect(service.getBySlug('nonexistent')).toBeUndefined();
  });
});
