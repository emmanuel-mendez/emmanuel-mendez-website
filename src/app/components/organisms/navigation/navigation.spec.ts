import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { Devices, Responsive } from '@services/responsive/responsive';
import { Navigation } from './navigation';

describe('Navigation', () => {
  let component: Navigation;
  let fixture: ComponentFixture<Navigation>;
  let device: WritableSignal<Devices[]>;

  beforeEach(async () => {
    device = signal<Devices[]>([Devices.DESKTOP]);

    await TestBed.configureTestingModule({
      imports: [Navigation],
      providers: [
        {
          provide: Responsive,
          useValue: {
            breakpoints: Devices,
            device,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should switch between desktop and mobile navigation and close the mobile menu', () => {
    const list = fixture.nativeElement.querySelector('.navigation__list');
    const menuButton = fixture.nativeElement.querySelector('.navigation__button');

    expect(list).toBeTruthy();
    expect(menuButton).toBeFalsy();
    device.set([Devices.MOBILE]);
    fixture.detectChanges();

    const mobileMenuButton: HTMLElement =
      fixture.nativeElement.querySelector('.navigation__button');
    expect(fixture.nativeElement.querySelector('.navigation__list')).toBeFalsy();
    expect(mobileMenuButton.querySelector('button')).not.toBeNull();
    mobileMenuButton.click();
    fixture.detectChanges();

    const backdrop = fixture.nativeElement.querySelector('.navigation__backdrop');
    const mobileMenu = fixture.nativeElement.querySelector('.navigation__menu');
    expect(backdrop).toBeTruthy();
    expect(mobileMenu).toBeTruthy();

    const mobileLink: HTMLAnchorElement = mobileMenu.querySelector('.navigation__link');
    mobileLink.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.navigation__menu')).toBeFalsy();
    expect(component.opened()).toBe(false);

    mobileMenuButton.click();
    fixture.detectChanges();

    const reopenedBackdrop: HTMLElement =
      fixture.nativeElement.querySelector('.navigation__backdrop');
    reopenedBackdrop.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.navigation__menu')).toBeFalsy();
    expect(component.opened()).toBe(false);
  });
});
