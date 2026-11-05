import { Component } from '@angular/core';
import { Content } from '@components/molecules/content/content';

@Component({
  selector: 'app-about',
  imports: [Content],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
