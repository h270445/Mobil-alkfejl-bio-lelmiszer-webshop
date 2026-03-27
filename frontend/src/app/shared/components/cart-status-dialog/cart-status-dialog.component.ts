import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export type CartStatusDialogAction = 'continue' | 'cart' | 'undo';
export type CartStatusDialogType = 'add-to-cart' | 'order-success' | 'purchase-failed';

export interface CartStatusDialogData {
  type?: CartStatusDialogType;
  title?: string;
  message: string;
  productId?: number;
  productName?: string;
  addedQuantity?: number;
  finalQuantity?: number;
  previousQuantity?: number;
  availableStock?: number;
  continueLabel?: string;
  cartLabel?: string;
  showDoNotShowAgain?: boolean;
}

export interface CartStatusDialogResult {
  action: CartStatusDialogAction;
  suppressFuture: boolean;
  selectedQuantity?: number;
}

@Component({
  selector: 'app-cart-status-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ resolvedTitle }}</h2>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
      <div class="stock-info" *ngIf="showQuantityControls">
        <p class="meta-line">Raktáron: <strong>{{ maxQuantity }} db</strong></p>
        <p class="meta-line">Jelenleg a kosárban: <strong>{{ data.finalQuantity || 0 }} db</strong></p>

        <div class="quantity-editor">
          <button type="button" mat-button (click)="decreaseQuantity()" [disabled]="selectedQuantity <= 1">-</button>
          <input
            type="number"
            min="1"
            [max]="maxQuantity"
            [(ngModel)]="selectedQuantity"
            (ngModelChange)="onQuantityChange($event)"
            aria-label="Kosár mennyiség"
          />
          <button type="button" mat-button (click)="increaseQuantity()" [disabled]="selectedQuantity >= maxQuantity">+</button>
        </div>
      </div>
      <label *ngIf="data.showDoNotShowAgain" class="remember-toggle">
        <input
          type="checkbox"
          [checked]="doNotShowAgain"
          (change)="onSuppressChange($event)"
        />
        <span>Ne mutasd újra ezt az értesítést</span>
      </label>
    </div>
    <div mat-dialog-actions align="end" class="dialog-actions">
      <button mat-raised-button color="accent" class="action-button continue-button" (click)="onContinue()">
        {{ data.continueLabel || 'Vásárlás folytatása' }}
      </button>
      <button mat-raised-button color="primary" class="action-button" (click)="onViewCart()">
        {{ data.cartLabel || 'Kosár megtekintése' }}
      </button>
      <button
        *ngIf="showQuantityControls"
        mat-raised-button
        class="undo-button action-button"
        (click)="onUndo()"
      >
        Visszavonás
      </button>
    </div>
  `,
  styles: [`
    .stock-info {
      margin-top: 12px;
      padding: 10px;
      border: 1px solid #e3e8e3;
      border-radius: 8px;
      background: #f7faf7;
    }

    .meta-line {
      margin: 0 0 6px;
      font-size: 14px;
      color: var(--color-text-secondary, #4a4a4a);
    }

    .quantity-editor {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
    }

    .quantity-editor input {
      width: 72px;
      height: 34px;
      border: 1px solid #cfd8cf;
      border-radius: 6px;
      text-align: center;
      padding: 4px;
    }

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

    .undo-button {
      background: #d32f2f;
      color: #fff;
    }

    .undo-button:hover {
      background: #b71c1c;
    }

    .dialog-actions {
      display: flex;
      gap: 10px;
    }

    .continue-button {
      font-weight: 500;
    }

    .dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
      margin-left: 0;
    }

    .action-button {
      min-height: 42px;
    }

    @media (max-width: 480px) {
      .dialog-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
        padding-top: 12px;
      }

      .action-button {
        width: 100%;
        min-height: 46px;
      }
    }
  `]
})
export class CartStatusDialogComponent {
  doNotShowAgain = false;
  selectedQuantity = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CartStatusDialogData,
    private dialogRef: MatDialogRef<CartStatusDialogComponent>
  ) {
    const initialQuantity = data.finalQuantity ?? 1;
    this.selectedQuantity = this.clampQuantity(initialQuantity);
  }

  get showQuantityControls(): boolean {
    return this.data.type === 'add-to-cart' && (this.data.productId ?? 0) > 0 && this.maxQuantity > 0;
  }

  get maxQuantity(): number {
    const value = this.data.availableStock ?? 0;
    return Math.max(0, value);
  }

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
      suppressFuture: this.doNotShowAgain,
      selectedQuantity: this.showQuantityControls ? this.selectedQuantity : undefined
    });
  }

  onViewCart(): void {
    this.dialogRef.close({
      action: 'cart',
      suppressFuture: this.doNotShowAgain,
      selectedQuantity: this.showQuantityControls ? this.selectedQuantity : undefined
    });
  }

  onUndo(): void {
    const previousQuantity = this.data.previousQuantity ?? 0;
    this.dialogRef.close({
      action: 'undo',
      suppressFuture: false,
      selectedQuantity: previousQuantity
    });
  }

  onQuantityChange(value: number | string): void {
    this.selectedQuantity = this.clampQuantity(value);
  }

  increaseQuantity(): void {
    this.selectedQuantity = this.clampQuantity(this.selectedQuantity + 1);
  }

  decreaseQuantity(): void {
    this.selectedQuantity = this.clampQuantity(this.selectedQuantity - 1);
  }

  private clampQuantity(value: number | string): number {
    const parsed = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(parsed) || parsed < 1) {
      return 1;
    }

    const max = this.maxQuantity || 1;
    return Math.min(max, Math.max(1, Math.floor(parsed)));
  }
}
