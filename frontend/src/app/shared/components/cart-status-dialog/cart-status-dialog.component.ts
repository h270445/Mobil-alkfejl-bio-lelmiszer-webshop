import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export type CartStatusDialogAction = 'continue' | 'cart';

export interface CartStatusDialogData {
  title?: string;
  message: string;
  continueLabel?: string;
  cartLabel?: string;
}

@Component({
  selector: 'app-cart-status-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Sikeres művelet' }}</h2>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="'continue'">
        {{ data.continueLabel || 'Vásárlás folytatása' }}
      </button>
      <button mat-raised-button color="primary" [mat-dialog-close]="'cart'">
        {{ data.cartLabel || 'Kosár megtekintése' }}
      </button>
    </div>
  `,
  styles: [``]
})
export class CartStatusDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CartStatusDialogData) {}
}
