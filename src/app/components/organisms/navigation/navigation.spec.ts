import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { Devices, Responsive } from '@services/responsive/responsive';
import { vi } from 'vitest';
import { Navigation } from './navigation';

describe('Navigation', () => {
  let component: Navigation;
  let fixture: ComponentFixture<Navigation>;
  let device: WritableSignal<Devices[]>;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    });
    device = signal<Devices[]>([Devices.DESKTOP]);

    await TestBed.configureTestingModule({
      imports: [Navigation],
      providers: [
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
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose reusable navigation items', () => {
    expect(component.navigationItems).toEqual([{ href: '/projects', label: 'Projects' }]);
  });

  it('should render desktop list for desktop devices', () => {
    const navigationElement = fixture.nativeElement.querySelector('nav.navigation');
    const list = fixture.nativeElement.querySelector('.navigation__list');
    const menuButton = fixture.nativeElement.querySelector('.navigation__button');

    expect(navigationElement?.getAttribute('aria-label')).toBe('Primary navigation');
    expect(list).toBeTruthy();
    expect(menuButton).toBeFalsy();
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
  });

  it('should open and close the mobile menu with focus management', async () => {
    device.set([Devices.MOBILE]);
    fixture.detectChanges();

    const menuButton: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('.navigation__button button');
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
    expect(document.activeElement).toBe(menuButton);
  });

  it('should close the mobile menu when pressing escape or clicking the backdrop', async () => {
    device.set([Devices.MOBILE]);
    fixture.detectChanges();

    const menuButton: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('.navigation__button button');
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
    reopenedBackdrop.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.navigation__menu')).toBeFalsy();
    expect(component.opened()).toBe(false);
  });
});
