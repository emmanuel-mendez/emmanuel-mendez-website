import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FeaturedProject, type FeaturedProjectModel } from './featured-project';

describe('FeaturedProject', () => {
  let component: FeaturedProject;
  let fixture: ComponentFixture<FeaturedProject>;

  const project: FeaturedProjectModel = {
    name: 'Astyimar y Emmanuel Wedding',
    projectRoute: ['/projects/astyimar-emmanuel-wedding'],
    desktopImageSrc: '/webp/astyimar-emmanuel-wedding--desktop.webp',
    desktopImageAlt: 'Astyimar and Emmanuel wedding website desktop preview',
    mobileImageSrc: '/webp/astyimar-emmanuel-wedding--mobile.webp',
    mobileImageAlt: 'Astyimar and Emmanuel wedding website mobile preview',
    tabletImageSrc: '/webp/astyimar-emmanuel-wedding--tablet.webp',
    tabletImageAlt: 'Astyimar and Emmanuel wedding website tablet preview',
    badgeIcon: 'bookmark',
    footerIcon: 'arrow_forward',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedProject],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProject);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render featured project details', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.featured-project')).toBeTruthy();
    expect(element.querySelector('.featured-project__name')?.textContent?.trim()).toBe(project.name);
    expect(
      (element.querySelector('.featured-project__image--desktop') as HTMLImageElement | null)?.getAttribute(
        'src',
      ),
    ).toBe(project.desktopImageSrc);
    expect(element.querySelector('a[href="/projects/astyimar-emmanuel-wedding"]')).toBeTruthy();
  });
});
