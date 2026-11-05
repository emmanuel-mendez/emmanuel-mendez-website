import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { vi } from 'vitest';
import { ProjectDetail } from './project-detail';

describe('ProjectDetail', () => {
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
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should render a secure external action link when source code is available', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll(
      'a.project-detail__action',
    );

    expect(links).toHaveLength(1);
    links.forEach((link) => {
      expect(link.hasAttribute('target')).toBe(true);
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      expect(link.hasAttribute('href')).toBe(true);
    });
  });

  it('should hide actions when a project has no external links', () => {
    slugParamMap$.next(convertToParamMap({ slug: 'highpeak' }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.project-detail__actions')).toBeNull();
  });
});
