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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve project from slug', () => {
    expect(component.project()).toBeTruthy();
    expect(component.project()?.title).toBe('Emmanuel Mendez Website');
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
