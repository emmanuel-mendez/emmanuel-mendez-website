import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Layout } from '@components/templates/layout/layout';

@Component({
  selector: 'app-home',
  imports: [Layout, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private document = inject(DOCUMENT);
  private metaService = inject(Meta);

  ngOnInit(): void {
    this.metaService.addTags([{ property: 'og:title', content: 'Home - Emmanuel Mendez' }]);
  }

  scrollToForm(): void {
    this.document.querySelector('.form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
