import { Pipe, PipeTransform } from '@angular/core';
import { Devices } from '@services/responsive/responsive';

@Pipe({
  name: 'includes',
})
export class ResponsiveIncludes implements PipeTransform {
  transform(active: Devices[], targets: Devices[]): boolean {
    return targets.some((target) => active.includes(target));
  }
}
