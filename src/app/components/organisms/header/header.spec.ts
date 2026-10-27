import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([
          { path: '', component: Header },
          { path: 'projects', component: Header },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render a logo with alternative text', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img.logo');
    expect(img).toBeTruthy();
    expect(img.hasAttribute('alt')).toBe(true);
  });

  it('should smoothly scroll to the top when the logo is clicked on home', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    fixture.nativeElement.querySelector('a').click();

    expect(scrollToSpy).toHaveBeenCalledExactlyOnceWith({ top: 0, behavior: 'smooth' });
  });

  it('should not scroll to the top when the logo is clicked on another route', async () => {
    await router.navigateByUrl('/projects');
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    fixture.componentInstance.scrollToTopOnHome();

    expect(scrollToSpy).not.toHaveBeenCalled();
  });
});
