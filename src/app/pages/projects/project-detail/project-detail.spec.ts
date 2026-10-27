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
            paramMap: of({ get: () => 'emmanuel-mendez-website' }),
            snapshot: { paramMap: { get: () => 'emmanuel-mendez-website' } },
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
    expect(component.project()?.title).toBe('Emmanuel Mendez Website');
  });

  it('should render the project role, sections, and secure actions', () => {
    expect(component.project()).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.project-detail')?.getAttribute('aria-labelledby'),
    ).toBe('project-detail-title');
    expect(fixture.nativeElement.querySelector('#project-detail-title')?.textContent).toContain(
      'Emmanuel Mendez Website',
    );
    expect(fixture.nativeElement.querySelector('.project-detail__role').textContent).toContain(
      'owner',
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
    expect(sections).toHaveLength(2);

    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll(
      'app-button.project-detail__link a',
    );

    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link.hasAttribute('target')).toBe(true);
      expect(link.hasAttribute('rel')).toBe(true);
      expect(link.hasAttribute('href')).toBe(true);
    });
  });
});
