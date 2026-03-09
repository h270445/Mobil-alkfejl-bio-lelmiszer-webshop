import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private router: Router) {}

  currentYear = new Date().getFullYear();

  contactInfo = {
    email: 'info@biomarket.hu',
    phone: '+36 1 234 5678',
    address: '1234 Budapest, Bio utca 10.'
  };

  socialLinks = [
    { name: 'Facebook', icon: 'assets/images/facebook-icon.svg', url: 'https://facebook.com' },
    { name: 'Instagram', icon: 'assets/images/instagram-icon.svg', url: 'https://instagram.com' },
    { name: 'Twitter', icon: 'assets/images/twitter-icon.svg', url: 'https://twitter.com' }
  ];

  get isProductsRoute(): boolean {
    return this.router.url.startsWith('/products');
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onSocialClick(name: string): void {
    console.log(`Navigate to ${name}`);
    // TODO: Open social media links
  }
}
