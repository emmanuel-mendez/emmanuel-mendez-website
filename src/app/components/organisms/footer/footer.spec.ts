import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose expected social media links and professional details', () => {
    expect(component.socialLinks).toEqual([
      { label: 'GitHub', href: 'https://github.com/emmanuel-mendez' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emmanuelmendezweb' },
    ]);
    expect(component.basicInfo).toEqual([
      { icon: 'work', text: 'Computer Engineer · Frontend Developer' },
      { icon: 'location_on', text: 'Based in Colombia · Open to remote work' },
      { icon: 'calendar_month', text: '5+ years building web applications' },
    ]);
  });

  it('should render secure external links for each social profile', () => {
    const links: NodeListOf<HTMLAnchorElement> =
      fixture.nativeElement.querySelectorAll('.footer__social-link');

    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link.hasAttribute('href')).toBe(true);
      expect(link.hasAttribute('target')).toBe(true);
      expect(link.hasAttribute('rel')).toBe(true);
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  it('should render identity and copyright with the current year', () => {
    const name = fixture.nativeElement.querySelector('.footer__name');
    const role = fixture.nativeElement.querySelector('.footer__role');
    const copyright = fixture.nativeElement.querySelector('.footer__copyright');

    expect(name?.textContent?.trim()).toBe('Emmanuel Mendez');
    expect(role?.textContent?.trim()).toBe('Building accessible and scalable web experiences.');
    expect(copyright?.textContent?.trim()).toContain(`© ${component.currentYear}`);
  });

  it('should render an icon for each professional detail', () => {
    const detailItems = fixture.nativeElement.querySelectorAll('.footer__info-item');
    const detailIcons = fixture.nativeElement.querySelectorAll('.footer__info-icon');

    expect(detailItems).toHaveLength(component.basicInfo.length);
    expect(detailIcons).toHaveLength(component.basicInfo.length);
  });
});
