import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Card } from './card';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render card content with updated card classes', () => {
    const element: HTMLElement = fixture.nativeElement;
    const label = element.querySelector('.card__label') as HTMLElement | null;
    const title = element.querySelector('.card__title') as HTMLElement | null;
    const skillBadges = Array.from(element.querySelectorAll('.card__skill-badge')) as HTMLElement[];
    const projectDesktopImage = element.querySelector(
      '.card__image--desktop',
    ) as HTMLImageElement | null;

    expect(label?.textContent?.trim()).toBe('Latest');
    expect(title?.textContent?.trim()).toBe('Astyimar & Emmanuel Wedding Website');
    expect(skillBadges.map((badge) => badge.textContent?.trim())).toEqual([
      'Typescript',
      'Astro',
      'Preact',
    ]);
    expect(projectDesktopImage?.getAttribute('src')).toBe(
      '/webp/astyimar-emmanuel-wedding--desktop.webp',
    );
    expect(element.querySelector('a[href="/projects/astyimar-emmanuel-wedding"]')).toBeTruthy();
    expect(
      element.querySelector('a[href="https://astyimar-y-emmanuel.com/emmanuel/"]'),
    ).toBeTruthy();
    expect(
      element.querySelector(
        'a[href="https://github.com/emmanuel-mendez/astyimar-emmanuel-wedding"]',
      ),
    ).toBeTruthy();
  });
});
