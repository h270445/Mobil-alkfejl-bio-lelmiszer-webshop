import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import {
  CartStatusDialogComponent,
  CartStatusDialogData,
  CartStatusDialogResult,
  CartStatusDialogType
} from '../../shared/components/cart-status-dialog/cart-status-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CartFeedbackService {
  private readonly SUPPRESS_ADD_TO_CART_KEY = 'biomarket_suppress_add_to_cart_popup';

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {}

  showAddToCartStatus(productName: string, quantity: number): void {
    if (!this.isAddToCartPopupEnabled()) {
      return;
    }

    const quantityText = quantity > 1 ? `${quantity} db` : '1 db';
    this.openStatusDialog({
      type: 'add-to-cart',
      message: `${quantityText} ${productName} sikeresen a kosárba került.`,
      showDoNotShowAgain: true
    });
  }

  showPurchaseFailedStatus(message: string): void {
    this.openStatusDialog({
      type: 'purchase-failed',
      message,
      continueLabel: 'Rendben',
      cartLabel: 'Kosár megtekintése',
      showDoNotShowAgain: false
    });
  }

  showOrderSuccessStatus(message: string): void {
    this.openStatusDialog({
      type: 'order-success',
      message,
      continueLabel: 'Vásárlás folytatása',
      cartLabel: 'Kosár megtekintése',
      showDoNotShowAgain: false
    });
  }

  isAddToCartPopupEnabled(): boolean {
    return localStorage.getItem(this.SUPPRESS_ADD_TO_CART_KEY) !== 'true';
  }

  setAddToCartPopupEnabled(enabled: boolean): void {
    if (enabled) {
      localStorage.removeItem(this.SUPPRESS_ADD_TO_CART_KEY);
      return;
    }

    localStorage.setItem(this.SUPPRESS_ADD_TO_CART_KEY, 'true');
  }

  private openStatusDialog(data: CartStatusDialogData): void {
    const dialogRef = this.dialog.open(CartStatusDialogComponent, {
      width: '380px',
      maxWidth: '92vw',
      data
    });

    dialogRef.afterClosed().subscribe((result: CartStatusDialogResult | undefined) => {
      if (!result) {
        return;
      }

      if (result.suppressFuture && data.type === 'add-to-cart') {
        localStorage.setItem(this.SUPPRESS_ADD_TO_CART_KEY, 'true');
      }

      if (result.action === 'cart') {
        this.router.navigate(['/cart']);
      }
    });
  }

}
