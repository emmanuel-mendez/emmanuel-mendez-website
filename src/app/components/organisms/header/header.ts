import { Component } from '@angular/core';
import { ThemePicker } from '@components/atoms/theme-picker/theme-picker/theme-picker';

@Component({
  selector: 'app-header',
  imports: [ThemePicker],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
