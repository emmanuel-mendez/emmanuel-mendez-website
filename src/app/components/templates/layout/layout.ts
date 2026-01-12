import { Component } from '@angular/core';
import { Footer } from '@components/organisms/footer/footer';
import { Header } from '@components/organisms/header/header';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
