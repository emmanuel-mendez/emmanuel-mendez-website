import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { Devices, Responsive } from '@services/responsive/responsive';
import { vi } from 'vitest';
import { Navigation } from './navigation';

describe('Navigation', () => {
  let component: Navigation;
  let fixture: ComponentFixture<Navigation>;
  let device: WritableSignal<Devices[]>;
  let router: Router;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    });
    device = signal<Devices[]>([Devices.DESKTOP]);

    await TestBed.configureTestingModule({
      imports: [Navigation],
      providers: [
        provideRouter([]),
        {
          provide: Responsive,
          useValue: {
            breakpoints: Devices,
            device,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navigation);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('navigation--menu-open');
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose reusable navigation items', () => {
    expect(component.navigationItems).toEqual([
      { href: '#home-about', label: 'About' },
      { href: '#home-projects', label: 'Projects' },
      { href: '#home-experience', label: 'Experience' },
      { href: '#home-skills', label: 'Skills' },
      { href: '#home-testimonials', label: 'Testimonials' },
      { href: '#home-contact', label: 'Contact' },
    ]);
  });

  it('should render desktop list for desktop devices', () => {
    const navigationElement: HTMLElement | null =
      fixture.nativeElement.querySelector('nav.navigation');
    const list = fixture.nativeElement.querySelector('.navigation__list');
    const menuButton = fixture.nativeElement.querySelector('.navigation__button');

    expect(navigationElement?.getAttribute('aria-label')).toBe('Primary navigation');
    expect(list).toBeTruthy();
    expect(menuButton).toBeFalsy();
    expect(fixture.nativeElement.querySelectorAll('.navigation__list a')).toHaveLength(1);
    expect(fixture.nativeElement.querySelectorAll('.navigation__section-list a')).toHaveLength(6);
  });

  it('should expose current page metadata for the active navigation link', () => {
    vi.spyOn(router, 'url', 'get').mockReturnValue('/projects');
    expect(component.isCurrentRoute('/projects')).toBe(true);
    expect(component.isCurrentRoute('/')).toBe(false);
  });

  it('should smoothly scroll to fragment links and update the URL hash', () => {
    const target = document.createElement('section');
    target.id = 'home-about';
    const scrollIntoView = vi.fn();
    target.scrollIntoView = scrollIntoView;
    document.body.append(target);

    const pushState = vi.spyOn(window.history, 'pushState');
    const event = new MouseEvent('click', { button: 0, cancelable: true });

    component.onNavigationLinkClick(event, '#home-about');

    expect(event.defaultPrevented).toBe(true);
    expect(pushState).toHaveBeenCalledWith(null, '', '#home-about');
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    target.remove();
    pushState.mockRestore();
  });

  it('should leave normal route links to their default navigation behavior', () => {
    const event = new MouseEvent('click', { button: 0, cancelable: true });

    component.onNavigationLinkClick(event, '/projects');

    expect(event.defaultPrevented).toBe(false);
  });

  it('should render hamburger menu for tablet devices', () => {
    device.set([Devices.TABLET]);
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.navigation__list');
    const menuButton = fixture.nativeElement.querySelector('.navigation__button');
    const toggleButton: HTMLButtonElement | null = menuButton?.querySelector('button');

    expect(list).toBeFalsy();
    expect(menuButton).toBeTruthy();
    expect(toggleButton?.type).toBe('button');
    expect(toggleButton?.getAttribute('aria-label')).toBe('Open navigation menu');
    expect(toggleButton?.getAttribute('aria-expanded')).toBe('false');
    expect(toggleButton?.getAttribute('aria-controls')).toBe(component.mobileMenuId);
  });

  it('should render hamburger menu for mobile devices', () => {
    device.set([Devices.MOBILE]);
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.navigation__list');
    const menuButton = fixture.nativeElement.querySelector('.navigation__button');

    expect(list).toBeFalsy();
    expect(menuButton).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.navigation__section-list')).toBeFalsy();
  });

  it('should open and close the mobile menu with focus management', async () => {
    device.set([Devices.MOBILE]);
    fixture.detectChanges();

    const menuButton: HTMLButtonElement | null = fixture.nativeElement.querySelector(
      '.navigation__button button',
    );
    expect(menuButton).toBeTruthy();
    menuButton?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const backdrop = fixture.nativeElement.querySelector('.navigation__backdrop');
    const mobileMenu: HTMLUListElement | null =
      fixture.nativeElement.querySelector('.navigation__menu');
    const firstLink = mobileMenu?.querySelector<HTMLAnchorElement>('.navigation__link') ?? null;

    expect(backdrop).toBeTruthy();
    expect(mobileMenu).toBeTruthy();
    expect(mobileMenu?.querySelectorAll('.navigation__link--section')).toHaveLength(6);
    expect(document.body.classList.contains('navigation--menu-open')).toBe(true);
    expect(menuButton?.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(firstLink);

    firstLink?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const hiddenMenu = fixture.nativeElement.querySelector('.navigation__menu');
    const hiddenBackdrop = fixture.nativeElement.querySelector('.navigation__backdrop');

    expect(hiddenMenu).toBeFalsy();
    expect(hiddenBackdrop).toBeFalsy();
    expect(component.opened()).toBe(false);
    expect(document.body.classList.contains('navigation--menu-open')).toBe(false);
    expect(document.activeElement).toBe(menuButton);
  });

  it('should close the mobile menu when pressing escape or clicking the backdrop', async () => {
    device.set([Devices.MOBILE]);
    fixture.detectChanges();

    const menuButton: HTMLButtonElement | null = fixture.nativeElement.querySelector(
      '.navigation__button button',
    );
    expect(menuButton).toBeTruthy();

    menuButton?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const openedMenu: HTMLUListElement | null =
      fixture.nativeElement.querySelector('.navigation__menu');
    openedMenu?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.navigation__menu')).toBeFalsy();
    expect(component.opened()).toBe(false);

    menuButton?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const reopenedBackdrop = fixture.nativeElement.querySelector('.navigation__backdrop');
    reopenedBackdrop?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.navigation__menu')).toBeFalsy();
    expect(component.opened()).toBe(false);
    expect(document.body.classList.contains('navigation--menu-open')).toBe(false);
  });
});
