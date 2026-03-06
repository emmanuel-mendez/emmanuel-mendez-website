import { Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Banner } from '@components/organisms/banner/banner';
import { Layout } from '@components/templates/layout/layout';

@Component({
  selector: 'app-home',
  imports: [Layout, Banner],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.metaService.addTags([{ property: 'og:title', content: 'Home - Emmanuel Mendez' }]);
  }
}
