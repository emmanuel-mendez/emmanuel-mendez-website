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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve project from slug', () => {
    expect(component.project()).toBeTruthy();
    expect(component.project()?.title).toBe('Toyota');
  });

  it('should render project role, products, and modules', () => {
    expect(fixture.nativeElement.querySelector('.project-detail__role').textContent).toContain(
      'collaborator',
    );
    const sections = fixture.nativeElement.querySelectorAll('.project-detail__section');
    expect(sections[0].textContent).toContain('Website');
    expect(sections[1].textContent).toContain('Colombia localization');
    expect(sections[1].textContent).toContain('Totem ads');
  });

  it('should render project actions through the shared Button component', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll(
      'app-button.project-detail__link a',
    );

    expect(links).toHaveLength(2);
    expect(links[0]?.target).toBe('_blank');
    expect(links[0]?.rel).toBe('noopener noreferrer');
  });
});
