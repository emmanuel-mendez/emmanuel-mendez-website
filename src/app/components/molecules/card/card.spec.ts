import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Card } from './card';

describe('Card', () => {
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    fixture.detectChanges();
  });

  it('should render card content with updated card classes', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('.card__label')).not.toBeNull();
    expect(element.querySelector('.card__title')).not.toBeNull();
    expect(element.querySelectorAll('.card__skill-badge').length).toBeGreaterThan(0);
    expect(element.querySelector('.card__image--desktop')).not.toBeNull();
    expect(element.querySelectorAll('.card__project-link, .card__resource-link').length).toBe(3);
  });
});
