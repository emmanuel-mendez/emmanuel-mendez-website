import { Component } from '@angular/core';
import { Section } from '@components/molecules/section/section';

@Component({
  selector: 'app-about',
  imports: [Section],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
