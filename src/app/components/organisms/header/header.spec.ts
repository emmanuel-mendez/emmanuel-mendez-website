import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
  });

  it('should render a logo with alternative text', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img.logo');
    expect(img).toBeTruthy();
    expect(img.hasAttribute('alt')).toBe(true);
  });
});
