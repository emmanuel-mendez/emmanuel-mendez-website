import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  inject,
  output,
  signal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { Button } from '@components/atoms/button/button';
import {
  FeaturedProject,
  type FeaturedProjectModel,
} from '@components/molecules/featured-project/featured-project';

type ProjectDirection = -1 | 1;

const AUTO_PLAY_DELAY = 4000;
const INITIAL_PROJECT_INDEX = 1;
const FEATURED_PROJECTS: readonly FeaturedProjectModel[] = [
  {
    name: 'Emmanuel Mendez Website',
    projectRoute: ['/projects/emmanuel-mendez-website'],
    desktopImageSrc: '/svg/logo--expanded--light.svg',
    desktopImageAlt: 'Emmanuel Mendez Website desktop preview',
    mobileImageSrc: '/svg/logo--expanded--light.svg',
    mobileImageAlt: 'Emmanuel Mendez Website mobile preview',
    tabletImageSrc: '/svg/logo--expanded--light.svg',
    tabletImageAlt: 'Emmanuel Mendez Website tablet preview',
    badgeIcon: 'bookmark',
    footerIcon: 'arrow_forward',
  },
  {
    name: 'Astyimar y Emmanuel',
    projectRoute: ['/projects/astyimar-y-emmanuel'],
    desktopImageSrc: '/projects/astyimar-y-emmanuel.png',
    desktopImageAlt: 'Astyimar y Emmanuel website desktop preview',
    mobileImageSrc: '/projects/astyimar-y-emmanuel.png',
    mobileImageAlt: 'Astyimar y Emmanuel website mobile preview',
    tabletImageSrc: '/projects/astyimar-y-emmanuel.png',
    tabletImageAlt: 'Astyimar y Emmanuel website tablet preview',
    badgeIcon: 'bookmark',
    footerIcon: 'arrow_forward',
  },
  {
    name: 'Toyota',
    projectRoute: ['/projects/toyota'],
    desktopImageSrc: '/projects/toyota.webp',
    desktopImageAlt: 'Toyota website desktop preview',
    mobileImageSrc: '/projects/toyota.webp',
    mobileImageAlt: 'Toyota website mobile preview',
    tabletImageSrc: '/projects/toyota.webp',
    tabletImageAlt: 'Toyota website tablet preview',
    badgeIcon: 'bookmark',
    footerIcon: 'arrow_forward',
  },
];

@Component({
  selector: 'app-banner',
  imports: [Button, FeaturedProject],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentProjectIndexSignal: WritableSignal<number> =
    signal<number>(INITIAL_PROJECT_INDEX);
  private readonly withTransitionSignal: WritableSignal<boolean> = signal<boolean>(true);
  private autoPlayIntervalId: number | null = null;

  public readonly featuredProjects: readonly FeaturedProjectModel[] = FEATURED_PROJECTS;
  public readonly featuredProjectsSlides: readonly FeaturedProjectModel[] = [
    FEATURED_PROJECTS[FEATURED_PROJECTS.length - 1],
    ...FEATURED_PROJECTS,
    FEATURED_PROJECTS[0],
  ];
  public readonly withTransition: Signal<boolean> = computed<boolean>(
    (): boolean => this.withTransitionSignal(),
  );
  public readonly projectsTransform: Signal<string> = computed<string>(
    (): string => `translate3d(-${this.currentProjectIndexSignal() * 100}%, 0, 0)`,
  );
  public readonly activeProjectIndex: Signal<number> = computed<number>(() => {
    const currentProjectIndex = this.currentProjectIndexSignal();
    if (currentProjectIndex === 0) {
      return this.featuredProjects.length - 1;
    }
    if (currentProjectIndex === this.featuredProjectsSlides.length - 1) {
      return 0;
    }
    return currentProjectIndex - 1;
  });

  public readonly contactRequested = output<void>();

  constructor() {
    afterNextRender((): void => this.startAutoPlay());
    this.destroyRef.onDestroy((): void => this.stopAutoPlay());
  }

  public showPreviousProject(): void {
    this.slideProjects(-1);
  }

  public showNextProject(): void {
    this.slideProjects(1);
  }

  public selectProject(projectIndex: number): void {
    this.withTransitionSignal.set(true);
    this.currentProjectIndexSignal.set(projectIndex + 1);
    this.restartAutoPlay();
  }

  public handleSlideTransitionEnd(): void {
    const currentProjectIndex = this.currentProjectIndexSignal();
    const resetProjectIndex = this.getResetProjectIndex(currentProjectIndex);
    if (currentProjectIndex === resetProjectIndex) {
      return;
    }
    this.withTransitionSignal.set(false);
    this.currentProjectIndexSignal.set(resetProjectIndex);
    this.enableTransitionOnNextFrame();
  }

  private slideProjects(direction: ProjectDirection): void {
    this.withTransitionSignal.set(true);
    this.currentProjectIndexSignal.update(
      (currentProjectIndex: number): number => currentProjectIndex + direction,
    );
    this.restartAutoPlay();
  }

  private getResetProjectIndex(currentProjectIndex: number): number {
    if (currentProjectIndex === 0) {
      return this.featuredProjects.length;
    }
    if (currentProjectIndex === this.featuredProjectsSlides.length - 1) {
      return INITIAL_PROJECT_INDEX;
    }
    return currentProjectIndex;
  }

  private enableTransitionOnNextFrame(): void {
    if (typeof window === 'undefined') {
      this.withTransitionSignal.set(true);
      return;
    }
    window.requestAnimationFrame((): void => this.withTransitionSignal.set(true));
  }

  private startAutoPlay(): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.autoPlayIntervalId = window.setInterval((): void => {
      this.withTransitionSignal.set(true);
      this.currentProjectIndexSignal.update(
        (currentProjectIndex: number): number => currentProjectIndex + 1,
      );
    }, AUTO_PLAY_DELAY);
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  private stopAutoPlay(): void {
    if (typeof window === 'undefined') {
      return;
    }
    if (this.autoPlayIntervalId === null) {
      return;
    }
    window.clearInterval(this.autoPlayIntervalId);
    this.autoPlayIntervalId = null;
  }
}
