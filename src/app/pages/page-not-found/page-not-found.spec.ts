import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { PageNotFound } from './page-not-found';

describe('PageNotFound', () => {
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
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should link to home and projects', () => {
    const actions = fixture.nativeElement.querySelectorAll('.page-not-found__action');

    expect(actions).toHaveLength(2);
    expect(actions[0]?.getAttribute('href')).toBe('/');
    expect(actions[1]?.getAttribute('href')).toBe('/projects');
  });
});
