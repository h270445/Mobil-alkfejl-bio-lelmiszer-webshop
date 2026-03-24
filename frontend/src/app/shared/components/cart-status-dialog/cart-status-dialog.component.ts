import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export type CartStatusDialogAction = 'continue' | 'cart';
export type CartStatusDialogType = 'add-to-cart' | 'order-success' | 'purchase-failed';

export interface CartStatusDialogData {
  type?: CartStatusDialogType;
  title?: string;
  message: string;
  continueLabel?: string;
  cartLabel?: string;
  showDoNotShowAgain?: boolean;
}

export interface CartStatusDialogResult {
  action: CartStatusDialogAction;
  suppressFuture: boolean;
}

@Component({
  selector: 'app-cart-status-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ resolvedTitle }}</h2>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
      <label *ngIf="data.showDoNotShowAgain" class="remember-toggle">
        <input
          type="checkbox"
          [checked]="doNotShowAgain"
          (change)="onSuppressChange($event)"
        />
        <span>Ne mutasd újra ezt az értesítést</span>
      </label>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onContinue()">
        {{ data.continueLabel || 'Vásárlás folytatása' }}
      </button>
      <button mat-raised-button color="primary" (click)="onViewCart()">
        {{ data.cartLabel || 'Kosár megtekintése' }}
      </button>
    </div>
  `,
  styles: [`
    .remember-toggle {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
      color: var(--color-text-secondary);
      font-size: 14px;
      margin-top: 14px;
    }

    .remember-toggle input {
      cursor: pointer;
    }

    .remember-toggle span {
      display: block;
      line-height: 1.4;
    }
  `]
})
export class CartStatusDialogComponent {
  doNotShowAgain = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CartStatusDialogData,
    private dialogRef: MatDialogRef<CartStatusDialogComponent>
  ) {}

  onSuppressChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.doNotShowAgain = target.checked;
  }

  get resolvedTitle(): string {
    if (this.data.title) {
      return this.data.title;
    }

    if (this.data.type === 'order-success') {
      return 'Rendelés sikeres';
    }

    if (this.data.type === 'purchase-failed') {
      return 'Vásárlás sikertelen';
    }

    return 'Termék kosárba helyezve';
  }

  onContinue(): void {
    this.dialogRef.close({
      action: 'continue',
      suppressFuture: this.doNotShowAgain
    });
  }

  onViewCart(): void {
    this.dialogRef.close({
      action: 'cart',
      suppressFuture: this.doNotShowAgain
    });
  }
}
