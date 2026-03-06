import { Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Layout } from '@components/templates/layout/layout';
import { About } from '@components/organisms/about/about';
import { Skills } from '@components/organisms/skills/skills';


@Component({
  selector: 'app-home',
  imports: [Layout, About, Skills],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private metaService = inject(Meta);

  ngOnInit(): void {
    this.metaService.addTags([{ property: 'og:title', content: 'Home - Emmanuel Mendez' }]);
  }
}
