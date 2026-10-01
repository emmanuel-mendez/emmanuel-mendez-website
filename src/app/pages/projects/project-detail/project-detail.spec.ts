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
});
