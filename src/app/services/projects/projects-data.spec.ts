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
    expect(service.projects.filter(({ rol }) => rol === 'owner')).toHaveLength(1);
  });

  it('should include all collaborator projects with their supplied details', () => {
    const titles = service.projects.map(({ title }) => title);
    expect(titles).toEqual(
      expect.arrayContaining([
        'Coca Cola',
        'Toyota',
        'Toyota Totem',
        'Shell GT',
        'Mars',
        'Castrol',
        'Bancolombia',
        'Rappi',
        'Rappi Redención',
        'Rappi Defensoría',
        'Rappi Mochilas',
        'Blog Rappitenderos',
        'Colombina',
        'Grupo Diana',
        'Wompi',
        'Banistmo',
        'Grupo Alen',
        'Comfaboy',
        'Grupo Uno Nicaragua',
        'Grupo Uno Honduras',
        'Expovinos 2021',
        'Foodbox',
        'Chillibean',
        'Alpina Quinquenios',
        'Ultra1Plus',
        'Dojo',
        'Highpeak',
        'Grateful',
        'Especialistas En Casa',
        'Q Buen Plan',
        'Geekboss',
        'Dra Skin',
        'Planetife',
        'Destiny Website',
        'Dosmass',
        'Adresles',
        'M374 Meta',
        'Agro Platform',
      ]),
    );

    expect(service.getBySlug('toyota')).toMatchObject({
      rol: 'collaborator',
      products: ['Website'],
      modules: ['Colombia localization', 'Totem ads'],
      technologies: ['Typescript', 'Next.js', 'Storybook'],
    });
    expect(service.getBySlug('m374')?.description).toBe('Renting virtual spaces in the metaverse.');
  });

  it('should return undefined for unknown slug', () => {
    expect(service.getBySlug('nonexistent')).toBeUndefined();
  });
});
