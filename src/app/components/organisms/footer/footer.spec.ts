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
