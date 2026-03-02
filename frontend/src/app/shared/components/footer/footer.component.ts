import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  contactInfo = {
    email: 'info@biomarket.hu',
    phone: '+36 1 234 5678',
    address: '1234 Budapest, Bio utca 10.'
  };

  socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
    { name: 'Instagram', icon: 'photo_camera', url: 'https://instagram.com' },
    { name: 'Twitter', icon: 'alternate_email', url: 'https://twitter.com' }
  ];

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
