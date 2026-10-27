import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home as Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Home);
    fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
  });

  it('should render the banner content and links', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('app-banner')).toBeTruthy();
  });
});
