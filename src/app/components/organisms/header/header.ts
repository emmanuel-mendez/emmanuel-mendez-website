import { Component } from '@angular/core';
import { Navigation } from '@components/organisms/navigation/navigation';
import { ThemePicker } from '@components/atoms/theme-picker/theme-picker/theme-picker';

@Component({
  selector: 'app-header',
  imports: [Navigation, ThemePicker],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
