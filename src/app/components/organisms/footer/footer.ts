import { Component } from '@angular/core';

type FooterSocialLink = {
  readonly label: string;
  readonly href: string;
};

type FooterInfoItem = {
  readonly icon: 'work' | 'location_on' | 'calendar_month';
  readonly text: string;
};

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  public readonly currentYear: number = new Date().getFullYear();

  public readonly socialLinks: readonly FooterSocialLink[] = [
    { label: 'GitHub', href: 'https://github.com/emmanuel-mendez' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emmanuelmendezweb' },
  ];

  public readonly basicInfo: readonly FooterInfoItem[] = [
    { icon: 'work', text: 'Computer Engineer · Frontend Developer' },
    { icon: 'location_on', text: 'Based in Colombia · Open to remote work' },
    { icon: 'calendar_month', text: '5+ years building web applications' },
  ];
}
