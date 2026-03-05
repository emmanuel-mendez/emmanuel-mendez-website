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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render desktop list for desktop devices', () => {
    const list = fixture.nativeElement.querySelector('.navigation__list');
    const menuButton = fixture.nativeElement.querySelector('.navigation__button');

    expect(list).toBeTruthy();
    expect(menuButton).toBeFalsy();
  });

  it('should render hamburger menu for tablet devices', () => {
    device.set([Devices.TABLET]);
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.navigation__list');
    const menuButton = fixture.nativeElement.querySelector('.navigation__button');

    expect(list).toBeFalsy();
    expect(menuButton).toBeTruthy();
  });
});
