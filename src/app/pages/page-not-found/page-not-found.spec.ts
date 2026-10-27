import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { PageNotFound } from './page-not-found';

describe('PageNotFound', () => {
  let component: PageNotFound;
  let fixture: ComponentFixture<PageNotFound>;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    });

    await TestBed.configureTestingModule({
      imports: [PageNotFound],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render accessible 404 copy and actions', () => {
    const element: HTMLElement = fixture.nativeElement;
    const title = element.querySelector('.page-not-found__title');
    const status = element.querySelector('.page-not-found__status');
    const description = element.querySelector('.page-not-found__description');
    const actions = element.querySelectorAll('.page-not-found__action');

    expect(status?.textContent?.trim()).toBe('404');
    expect(title?.textContent?.trim()).toBe('Page not found');
    expect(description?.textContent?.trim()).toBe(
      'The page you are looking for does not exist or may have been moved.',
    );
    expect(actions).toHaveLength(2);
    expect(actions[0]?.textContent?.trim()).toBe('Go to home');
    expect(actions[0]?.getAttribute('href')).toBe('/');
    expect(actions[1]?.textContent?.trim()).toBe('View projects');
    expect(actions[1]?.getAttribute('href')).toBe('/projects');
  });
});
