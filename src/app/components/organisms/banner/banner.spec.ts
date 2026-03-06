import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Banner } from './banner';

describe('Banner', () => {
  let component: Banner;
  let fixture: ComponentFixture<Banner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Banner],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Banner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and project links', () => {
    const element: HTMLElement = fixture.nativeElement;
    const titleElement = element.querySelector('.banner__title') as HTMLElement | null;
    const descriptionElement = element.querySelector('.banner__description') as HTMLElement | null;
    const titleLines = Array.from(element.querySelectorAll('.banner__title-line')) as HTMLElement[];

    expect(titleElement).toBeTruthy();
    expect(titleLines).toHaveLength(2);
    expect(titleLines[0]?.textContent?.trim()).toBe("I'm Emmanuel Mendez");
    expect(titleLines[1]?.textContent?.trim()).toBe('Computer Engineer');
    expect(descriptionElement?.textContent?.trim()).toBe(
      '5+ years building high-performance web apps.',
    );
  });
});
