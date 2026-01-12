import {
  Injectable,
  signal,
  afterNextRender,
  WritableSignal,
  computed,
  Signal,
} from '@angular/core';

export enum Devices {
  LOADING = 'LOADING',
  MOBILE = 'MOBILE',
  MOBILE_SHORT = 'MOBILE_SHORT',
  MOBILE_MEDIUM = 'MOBILE_MEDIUM',
  MOBILE_LARGE = 'MOBILE_LARGE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
  DESKTOP_SHORT = 'DESKTOP_SHORT',
  DESKTOP_MEDIUM = 'DESKTOP_MEDIUM',
  DESKTOP_LARGE = 'DESKTOP_LARGE',
  DESKTOP_EXTRA_LARGE = 'DESKTOP_EXTRA_LARGE',
  DESKTOP_EXTRA_EXTRA_LARGE = 'DESKTOP_EXTRA_EXTRA_LARGE',
}

const BREAKPOINT_MAP = [
  {
    minWidth: 2560,
    devices: [Devices.DESKTOP, Devices.DESKTOP_LARGE, Devices.DESKTOP_EXTRA_EXTRA_LARGE],
  },
  {
    minWidth: 1440,
    devices: [Devices.DESKTOP, Devices.DESKTOP_LARGE, Devices.DESKTOP_EXTRA_LARGE],
  },
  { minWidth: 1366, devices: [Devices.DESKTOP, Devices.DESKTOP_LARGE] },
  { minWidth: 1280, devices: [Devices.DESKTOP, Devices.DESKTOP_MEDIUM] },
  { minWidth: 1024, devices: [Devices.DESKTOP, Devices.DESKTOP_SHORT] },
  { minWidth: 768, devices: [Devices.TABLET] },
  { minWidth: 425, devices: [Devices.MOBILE, Devices.MOBILE_LARGE] },
  { minWidth: 375, devices: [Devices.MOBILE, Devices.MOBILE_MEDIUM] },
  { minWidth: 1, devices: [Devices.MOBILE, Devices.MOBILE_SHORT] },
  { minWidth: null, devices: [Devices.LOADING] },
];

@Injectable({
  providedIn: 'root',
})
export class Responsive {
  private readonly widthSignal: WritableSignal<number> = signal<number>(0);

  public readonly breakpoints: typeof Devices = Devices;

  public readonly device: Signal<Devices[]> = computed((): Devices[] => {
    const config = BREAKPOINT_MAP.find((breakpoint) => {
      if (breakpoint.minWidth) {
        return this.widthSignal() >= breakpoint.minWidth;
      }
      return;
    });
    return config ? config.devices : [Devices.LOADING];
  });

  constructor() {
    afterNextRender(() => {
      this.widthSignal.set(window.innerWidth);
      this.initResizeListener();
    });
  }

  private initResizeListener(): void {
    let timeout: number;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(timeout);
      timeout = requestAnimationFrame(() => {
        this.widthSignal.set(window.innerWidth);
      });
    });
  }
}
