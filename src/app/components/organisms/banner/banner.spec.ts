import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Banner } from './banner';

describe('Banner', () => {
  let fixture: ComponentFixture<Banner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Banner],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Banner);
    fixture = TestBed.createComponent(Banner);
    fixture.detectChanges();
  });

  it('should render title and project links', () => {
    const element: HTMLElement = fixture.nativeElement;
    const titleLines = Array.from(element.querySelectorAll('.banner__title-line')) as HTMLElement[];
    const actions = Array.from(element.querySelectorAll('app-button'));

    expect(titleLines).toHaveLength(2);
    expect(actions).toHaveLength(2);
    expect(actions[0]?.querySelector('a')).not.toBeNull();
    expect(actions[1]?.querySelector('button')).not.toBeNull();
  });
});
