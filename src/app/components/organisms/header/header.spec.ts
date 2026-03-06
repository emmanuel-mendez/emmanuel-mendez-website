import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';

import { Header } from './header';
import { Devices, Responsive } from '@services/responsive/responsive';
import { ThemeMode, Theme } from '@services/theme/theme';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let theme: Theme;
  let mockDevice: WritableSignal<Devices[]>;

  beforeEach(async () => {
    mockDevice = signal<Devices[]>([Devices.MOBILE, Devices.MOBILE_MEDIUM]);

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        {
          provide: Responsive,
          useValue: { device: mockDevice },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    theme = TestBed.inject(Theme);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
