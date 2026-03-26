import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartResult, CartService } from './cart.service';
import { Product } from '../../shared/models';

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
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private cartService: CartService
  ) {}

  showAddToCartStatus(product: Product, addResult: AddToCartResult): void {
    const quantityText = addResult.addedQuantity > 1 ? `${addResult.addedQuantity} db` : '1 db';
    const previousQuantity = Math.max(0, addResult.finalQuantity - addResult.addedQuantity);
    this.openStatusDialog({
      type: 'add-to-cart',
      productId: product.id,
      productName: product.name,
      addedQuantity: addResult.addedQuantity,
      finalQuantity: addResult.finalQuantity,
      previousQuantity,
      availableStock: addResult.availableStock,
      message: `${quantityText} ${product.name} sikeresen a kosárba került.`,
      showDoNotShowAgain: false,
      continueLabel: 'Tovább',
      cartLabel: 'Kosár megtekintése'
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

  // Compatibility methods used by profile settings.
  isAddToCartPopupEnabled(): boolean {
    return true;
  }

  setAddToCartPopupEnabled(_enabled: boolean): void {
    // Intentionally no-op: add-to-cart notification is now always shown.
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

      if (result.action === 'undo' && (data.productId ?? 0) > 0) {
        this.cartService.updateQuantity(data.productId!, data.previousQuantity ?? 0);
        return;
      }

      if (data.type === 'add-to-cart' && (data.productId ?? 0) > 0 && typeof result.selectedQuantity === 'number') {
        this.cartService.updateQuantity(data.productId!, result.selectedQuantity);
      }

      if (result.action === 'cart') {
        this.router.navigate(['/cart']);
      }
    });
  }

}
