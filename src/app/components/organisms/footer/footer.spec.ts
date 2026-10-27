import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';

import { Footer } from './footer';
import { Devices, Responsive } from '@services/responsive/responsive';

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;
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
    fixture.detectChanges();
  });

  it('should render secure external links for each social profile', () => {
    const links: NodeListOf<HTMLAnchorElement> =
      fixture.nativeElement.querySelectorAll('.social-link');

    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link.hasAttribute('href')).toBe(true);
      expect(link.hasAttribute('target')).toBe(true);
      expect(link.hasAttribute('rel')).toBe(true);
    });
  });
});
