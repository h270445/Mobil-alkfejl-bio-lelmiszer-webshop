import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      
      <main class="main-content" #mainContent>
        <router-outlet></router-outlet>
      </main>
      
      <app-footer [minimalMode]="isAdminRoute"></app-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      overflow-x: clip;
    }

    app-header,
    app-footer,
    .main-content {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      overflow-x: clip;
    }

    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 100%;
      max-width: 100%;
      overflow-x: clip;
    }

    .main-content {
      flex: 1;
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      min-width: 0;
      overflow-x: clip;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  @ViewChild('mainContent') mainContent!: ElementRef<HTMLElement>;

  constructor(private router: Router) {}

  title = 'BioMarket';

  ngOnInit(): void {
    // Scroll to top on every route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToTop();
      });
  }

  private scrollToTop(): void {
    // Use multiple methods to ensure scroll works across all browsers
    setTimeout(() => {
      // Method 1: Scroll main content container
      if (this.mainContent?.nativeElement) {
        this.mainContent.nativeElement.scrollTop = 0;
      }
      
      // Method 2: Scroll window
      window.scrollTo(0, 0);
      
      // Method 3: Scroll document element and body
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }

  get isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
