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
  });
});
