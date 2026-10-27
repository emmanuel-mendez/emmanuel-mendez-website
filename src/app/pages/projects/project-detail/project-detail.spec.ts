import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ProjectDetail } from './project-detail';

describe('ProjectDetail', () => {
  let component: ProjectDetail;
  let fixture: ComponentFixture<ProjectDetail>;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    });

    await TestBed.configureTestingModule({
      imports: [ProjectDetail],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'toyota' }),
            snapshot: { paramMap: { get: () => 'toyota' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve project from slug', () => {
    expect(component.project()).toBeTruthy();
    expect(component.project()?.title).toBe('Toyota');
  });

  it('should render project role, products, and modules', () => {
    expect(
      fixture.nativeElement.querySelector('.project-detail')?.getAttribute('aria-labelledby'),
    ).toBe('project-detail-title');
    expect(fixture.nativeElement.querySelector('#project-detail-title')?.textContent).toContain(
      'Toyota',
    );
    expect(fixture.nativeElement.querySelector('.project-detail__role').textContent).toContain(
      'collaborator',
    );
    expect(
      fixture.nativeElement
        .querySelectorAll('.project-detail__list')[0]
        ?.getAttribute('aria-label'),
    ).toBe('Products list');
    expect(
      fixture.nativeElement
        .querySelectorAll('.project-detail__list')[1]
        ?.getAttribute('aria-label'),
    ).toBe('Modules list');
    const sections = fixture.nativeElement.querySelectorAll('.project-detail__section');
    expect(sections[0].textContent).toContain('Website');
    expect(sections[1].textContent).toContain('Colombia localization');
    expect(sections[1].textContent).toContain('Totem ads');
  });

  it('should render project actions through the shared Button component', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll(
      'app-button.project-detail__link a',
    );

    expect(links).toHaveLength(1);
    expect(links[0]?.getAttribute('aria-label')).toBe('Open live demo for Toyota');
    expect(links[0]?.target).toBe('_blank');
    expect(links[0]?.rel).toBe('noopener noreferrer');
  });
});
