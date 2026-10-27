import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Banner } from './banner';

describe('Banner', () => {
  let fixture: ComponentFixture<Banner>;
  let component: Banner;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Banner],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Banner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fixture.destroy();
  });

  it('should render title, actions and featured projects swiper', () => {
    const element: HTMLElement = fixture.nativeElement;
    const titleLines = Array.from(element.querySelectorAll('.banner__title-line')) as HTMLElement[];
    const actions = Array.from(element.querySelectorAll('app-button'));
    const featuredProjects = Array.from(
      element.querySelectorAll('.banner__featured-projects-swiper-slide app-featured-project'),
    );
    const paginationButtons = Array.from(
      element.querySelectorAll('.banner__featured-projects-swiper-bullet'),
    );

    expect(titleLines).toHaveLength(2);
    expect(actions).toHaveLength(2);
    expect(actions[0]?.querySelector('a')).not.toBeNull();
    expect(actions[1]?.querySelector('button')).not.toBeNull();
    expect(featuredProjects).toHaveLength(5);
    expect(paginationButtons).toHaveLength(3);
  });

  it('should move to the next and previous featured projects', () => {
    expect(component.activeProjectIndex()).toBe(0);
    expect(component.projectsTransform()).toBe('translate3d(-100%, 0, 0)');

    component.showNextProject();

    expect(component.activeProjectIndex()).toBe(1);
    expect(component.projectsTransform()).toBe('translate3d(-200%, 0, 0)');

    component.showPreviousProject();

    expect(component.activeProjectIndex()).toBe(0);
    expect(component.projectsTransform()).toBe('translate3d(-100%, 0, 0)');
  });

  it('should select a specific featured project', () => {
    component.selectProject(2);

    expect(component.activeProjectIndex()).toBe(2);
  });

  it('should loop to the last project after leading clone transition', () => {
    component.showPreviousProject();
    component.handleSlideTransitionEnd();

    expect(component.activeProjectIndex()).toBe(2);
  });

  it('should loop to the first project after trailing clone transition', () => {
    component.selectProject(2);
    component.showNextProject();
    component.handleSlideTransitionEnd();

    expect(component.activeProjectIndex()).toBe(0);
  });

  it('should disable transition while resetting a clone slide', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((): number => 0);

    component.showPreviousProject();
    component.handleSlideTransitionEnd();

    expect(component.withTransition()).toBe(false);
  });
});
