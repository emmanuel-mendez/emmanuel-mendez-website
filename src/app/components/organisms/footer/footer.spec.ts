import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';

import { Footer } from './footer';
import { Devices, Responsive } from '@services/responsive/responsive';
import { ThemeMode, Theme } from '@services/theme/theme';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let theme: Theme;
  let mockDevice: WritableSignal<Devices[]>;

  beforeEach(async () => {
    mockDevice = signal<Devices[]>([Devices.MOBILE, Devices.MOBILE_MEDIUM]);

    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [
        {
          provide: Responsive,
          useValue: { device: mockDevice },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    theme = TestBed.inject(Theme);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a GitHub link', () => {
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector(
      'a[aria-label="GitHub"]',
    );
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toContain('github.com');
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toContain('noopener');
  });

  it('should render a LinkedIn link', () => {
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector(
      'a[aria-label="LinkedIn"]',
    );
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toContain('linkedin.com');
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toContain('noopener');
  it('should render a logo image with alt text', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img.logo');
    expect(img).toBeTruthy();
    expect(img.alt).toBe('Emmanuel Mendez');
  });

  it('should return compact dark logo on mobile in dark mode', () => {
    theme.set(ThemeMode.DARK);
    expect(component.logoSrc()).toBe('/svg/logo.svg');
  });

  it('should return compact light logo on mobile in light mode', () => {
    theme.set(ThemeMode.LIGHT);
    expect(component.logoSrc()).toBe('/svg/logo--light.svg');
  });

  it('should return expanded dark logo on desktop in dark mode', () => {
    mockDevice.set([Devices.DESKTOP, Devices.DESKTOP_MEDIUM]);
    theme.set(ThemeMode.DARK);
    expect(component.logoSrc()).toBe('/svg/logo--expanded.svg');
  });

  it('should return expanded light logo on desktop in light mode', () => {
    mockDevice.set([Devices.DESKTOP, Devices.DESKTOP_MEDIUM]);
    theme.set(ThemeMode.LIGHT);
    expect(component.logoSrc()).toBe('/svg/logo--expanded--light.svg');
  });
});
