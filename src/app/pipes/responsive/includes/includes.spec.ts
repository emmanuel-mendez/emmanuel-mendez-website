import { ResponsiveIncludes } from './includes';
import { Devices } from '@services/responsive/responsive';

describe('ResponsiveIncludes', () => {
  it('should detect whether any target device is active', () => {
    const pipe: ResponsiveIncludes = new ResponsiveIncludes();

    expect(pipe.transform([Devices.MOBILE, Devices.MOBILE_MEDIUM], [Devices.MOBILE])).toBe(true);
    expect(pipe.transform([Devices.MOBILE], [Devices.DESKTOP, Devices.TABLET])).toBe(false);
  });
});
