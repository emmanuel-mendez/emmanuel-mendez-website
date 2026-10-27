import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProjectDetail } from './project-detail';

describe('ProjectDetail', () => {
  let component: ProjectDetail;
  let fixture: ComponentFixture<ProjectDetail>;

  beforeEach(async () => {
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

  it('should resolve and render the project role, sections, and secure actions', () => {
    expect(component.project()).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.project-detail__role')).not.toBeNull();
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
