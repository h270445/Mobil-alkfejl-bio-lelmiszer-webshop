import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <app-footer></app-footer>
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
export class AppComponent {
  title = 'BioMarket';
}
