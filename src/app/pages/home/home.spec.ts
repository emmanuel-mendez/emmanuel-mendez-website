import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { Home as Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    });

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the banner content and links', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('app-banner')).toBeTruthy();
  });

  it('should not render the home section quick links in the page content', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.home__quick-nav')).toBeNull();
  });

  it('should expose section anchors for all primary home blocks', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('#home-about')).toBeTruthy();
    expect(element.querySelector('#home-projects')).toBeTruthy();
    expect(element.querySelector('#home-experience')).toBeTruthy();
    expect(element.querySelector('#home-skills')).toBeTruthy();
    expect(element.querySelector('#home-testimonials')).toBeTruthy();
    expect(element.querySelector('#home-contact')).toBeTruthy();
  });
});
