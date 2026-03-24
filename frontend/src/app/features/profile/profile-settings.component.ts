import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartFeedbackService } from '../../core/services/cart-feedback.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="profile-settings">
      <h1>Felhasználói beállítások</h1>

      <div class="setting-card">
        <div class="setting-copy">
          <h2>Kosár popup értesítések</h2>
          <p>
            Termék kosárba helyezésekor megjelenő popup be- vagy kikapcsolása.
          </p>
        </div>

        <label class="switch" aria-label="Kosár popup engedélyezése">
          <input
            type="checkbox"
            [checked]="addToCartPopupEnabled"
            (change)="onToggleAddToCartPopup($event)"
          />
          <span class="slider"></span>
        </label>
      </div>
    </section>
  `,
  styles: [`
    .profile-settings {
      max-width: 860px;
      margin: 0 auto;
      padding: 8px 0;
    }

    h1 {
      margin: 0 0 20px;
      color: var(--color-text-primary);
    }

    .setting-card {
      background: var(--color-surface);
      border-radius: 12px;
      padding: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      border: 1px solid #e5e5e5;
    }

    .setting-copy h2 {
      margin: 0 0 8px;
      font-size: 18px;
      color: var(--color-text-primary);
    }

    .setting-copy p {
      margin: 0;
      color: var(--color-text-secondary);
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 52px;
      height: 30px;
      flex: 0 0 auto;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background-color: #c4c4c4;
      transition: .2s;
      border-radius: 999px;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 24px;
      width: 24px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .2s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--color-primary);
    }

    input:checked + .slider:before {
      transform: translateX(22px);
    }

    @media (max-width: 700px) {
      .setting-card {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class ProfileSettingsComponent implements OnInit {
  addToCartPopupEnabled = true;

  constructor(private cartFeedbackService: CartFeedbackService) {}

  ngOnInit(): void {
    this.addToCartPopupEnabled = this.cartFeedbackService.isAddToCartPopupEnabled();
  }

  onToggleAddToCartPopup(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.addToCartPopupEnabled = target.checked;
    this.cartFeedbackService.setAddToCartPopupEnabled(this.addToCartPopupEnabled);
  }
}
