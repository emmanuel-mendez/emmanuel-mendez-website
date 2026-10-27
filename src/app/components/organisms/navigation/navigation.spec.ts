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
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose reusable navigation items', () => {
    expect(component.navigationItems).toEqual([{ href: '/projects', label: 'Projects' }]);
  });

  it('should render desktop list for desktop devices', () => {
    const list = fixture.nativeElement.querySelector('.navigation__list');
    const menuButton = fixture.nativeElement.querySelector('.navigation__button');

    expect(list).toBeTruthy();
    expect(menuButton).toBeFalsy();
  });

  it('should expose current page metadata for the active navigation link', () => {
    vi.spyOn(router, 'url', 'get').mockReturnValue('/projects');
    expect(component.isCurrentRoute('/projects')).toBe(true);
    expect(component.isCurrentRoute('/')).toBe(false);
  });

  it('should render hamburger menu for tablet devices', () => {
    device.set([Devices.TABLET]);
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.navigation__list');
    const menuButton = fixture.nativeElement.querySelector('.navigation__button');

    expect(list).toBeFalsy();
    expect(menuButton).toBeTruthy();
    expect(menuButton.querySelector('button')?.type).toBe('button');
  });

  it('should render hamburger menu for mobile devices', () => {
    device.set([Devices.MOBILE]);
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.navigation__list');
    const menuButton = fixture.nativeElement.querySelector('.navigation__button');

    expect(list).toBeFalsy();
    expect(menuButton).toBeTruthy();
  });

  it('should open and close the mobile menu', () => {
    device.set([Devices.MOBILE]);
    fixture.detectChanges();

    const menuButton = fixture.nativeElement.querySelector('.navigation__button');
    menuButton.click();
    fixture.detectChanges();

    const backdrop = fixture.nativeElement.querySelector('.navigation__backdrop');
    const mobileMenu = fixture.nativeElement.querySelector('.navigation__menu');
    expect(backdrop).toBeTruthy();
    expect(mobileMenu).toBeTruthy();

    const homeLink = fixture.nativeElement.querySelector('.navigation__menu .navigation__link');
    homeLink.click();
    fixture.detectChanges();

    const hiddenMenu = fixture.nativeElement.querySelector('.navigation__menu');
    const hiddenBackdrop = fixture.nativeElement.querySelector('.navigation__backdrop');
    expect(hiddenMenu).toBeFalsy();
    expect(hiddenBackdrop).toBeFalsy();
    expect(component.opened()).toBe(false);

    menuButton.click();
    fixture.detectChanges();

    const reopenedBackdrop = fixture.nativeElement.querySelector('.navigation__backdrop');
    reopenedBackdrop.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.navigation__menu')).toBeFalsy();
    expect(component.opened()).toBe(false);
  });
});
