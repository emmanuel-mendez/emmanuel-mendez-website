import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { Home as Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the banner content and links', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.banner__title')?.textContent).toContain(
      "I'm Emmanuel Mendez your Computer Engineer",
    );
    expect(element.querySelector('a[href="/projects"]')).toBeTruthy();
    expect(
      element.querySelector('a[href="/projects/astyimar-emmanuel-wedding"]')?.textContent,
    ).toContain('See moore');
    expect(
      element.querySelector('a[href="https://astyimar-y-emmanuel.com/emmanuel/"]'),
    ).toBeTruthy();
    expect(
      element.querySelector('a[href="https://github.com/emmanuel-mendez/astyimar-y-emmanuel"]'),
    ).toBeTruthy();
    expect(element.querySelector('.form')).toBeTruthy();
  });

  it('should scroll to form when scrollToForm is called', () => {
    const scrollIntoView = vi.fn();
    const querySelectorSpy = vi
      .spyOn(document, 'querySelector')
      .mockReturnValue({ scrollIntoView } as unknown as Element);

    component.scrollToForm();

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    querySelectorSpy.mockRestore();
  });
});
