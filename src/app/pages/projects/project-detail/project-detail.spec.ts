import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { vi } from 'vitest';
import { ProjectDetail } from './project-detail';

describe('ProjectDetail', () => {
  let component: ProjectDetail;
  let fixture: ComponentFixture<ProjectDetail>;
  let slugParamMap$: BehaviorSubject<ParamMap>;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    });

    slugParamMap$ = new BehaviorSubject<ParamMap>(
      convertToParamMap({ slug: 'emmanuel-mendez-website' }),
    );

    await TestBed.configureTestingModule({
      imports: [ProjectDetail],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: slugParamMap$.asObservable(),
            snapshot: { paramMap: slugParamMap$.value },
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
    expect(component.roleLabel()).toBe('Author');
    expect(component.factItems().map((fact) => fact.label)).toEqual([
      'Role',
      'Year',
      'Timeline',
      'Scope',
    ]);
    expect(component.detailSections().map((section) => section.title)).toEqual([
      'Products',
      'Modules',
      'Responsibilities',
    ]);
    expect(component.actions().map((action) => action.label)).toEqual(['Details', 'Source']);
  });

  it('should render the redesigned project detail sections and secure actions', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(component.project()).toBeTruthy();
    expect(element.querySelector('.project-detail__hero')).not.toBeNull();
    expect(element.querySelector('#project-detail-title')?.textContent).toContain(
      'Emmanuel Mendez Website',
    );
    expect(element.querySelector('.project-detail__image')?.getAttribute('loading')).toBe('lazy');
    expect(element.querySelector('.project-detail__role')?.textContent?.trim()).toBe('Author');
    expect(element.querySelectorAll('.project-detail__fact')).toHaveLength(4);
    expect(element.querySelectorAll('.project-detail__highlight')).toHaveLength(3);
    expect(element.querySelectorAll('.project-detail__list-block')).toHaveLength(3);
    expect(element.querySelectorAll('.project-detail__timeline-item')).toHaveLength(3);
    expect(element.querySelector('.project-detail__tags')?.getAttribute('aria-label')).toBe(
      'Technology stack',
    );

    const links: NodeListOf<HTMLAnchorElement> = element.querySelectorAll('a.project-detail__action');

    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link.hasAttribute('target')).toBe(true);
      expect(link.hasAttribute('rel')).toBe(true);
      expect(link.hasAttribute('href')).toBe(true);
    });
  });

  it('should hide actions when a project has no external links', () => {
    slugParamMap$.next(convertToParamMap({ slug: 'highpeak' }));
    fixture.detectChanges();

    expect(component.actions()).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('.project-detail__actions')).toBeNull();
  });

  it('should render not-found state for unknown projects', () => {
    slugParamMap$.next(convertToParamMap({ slug: 'unknown-project' }));
    fixture.detectChanges();

    expect(component.project()).toBeUndefined();
    expect(fixture.nativeElement.querySelector('.project-detail--not-found')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.project-detail__hero')).toBeNull();
  });
});
