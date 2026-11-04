import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, type WritableSignal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { Devices, Responsive } from '@services/responsive/responsive';

import { Banner } from './banner';

describe('Banner', () => {
  let fixture: ComponentFixture<Banner>;
  let device: WritableSignal<Devices[]>;

  beforeEach(async () => {
    device = signal<Devices[]>([Devices.DESKTOP, Devices.DESKTOP_SHORT]);
    await TestBed.configureTestingModule({
      imports: [Banner],
      providers: [
        provideRouter([]),
        {
          provide: Responsive,
          useValue: { device },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Banner);
    fixture.detectChanges();
  });

  it('should use the custom navigation controls to move between projects', () => {
    const element: HTMLElement = fixture.nativeElement;
    const carousel = fixture.debugElement.query(By.directive(CarouselComponent))
      .componentInstance as CarouselComponent;
    const previousButton = element.querySelector<HTMLButtonElement>(
      '[aria-label="Previous featured project"]',
    );
    const nextButton = element.querySelector<HTMLButtonElement>(
      '[aria-label="Next featured project"]',
    );
    const previousSpy = vi.spyOn(carousel, 'prev');
    const nextSpy = vi.spyOn(carousel, 'next');

    previousButton?.click();
    nextButton?.click();

    expect(previousSpy).toHaveBeenCalledOnce();
    expect(nextSpy).toHaveBeenCalledOnce();
  });
});
