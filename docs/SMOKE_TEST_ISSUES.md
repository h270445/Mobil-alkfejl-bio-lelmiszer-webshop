# Smoke Test & User Testing Issues - March 26, 2026

## Overview
12 issues identified during smoke testing and user testing. All must be resolved before M1 submission (2026-03-29 23:59 CET).

## Issue Tracking

### 1. ❌ Order Summary After Checkout
- **Status**: Not started
- **Description**: After order submission, the summary page has a typo and missing detailed summary information
- **Affected Files**: `features/checkout/checkout.component.ts`, `features/checkout/checkout.component.html`
- **Priority**: HIGH (User-facing, critical feature)
- **Changes Needed**: 
  - Fix typo in success message
  - Add detailed order summary with items, quantities, prices, shipping cost

### 2. ❌ Missing Notification Address
- **Status**: Not started
- **Description**: Profile page and order details missing notification/shipping address field
- **Affected Files**: `features/profile/profile-settings.component.ts`, `shared/models/index.ts`, `features/orders/order-detail.component.ts`
- **Priority**: HIGH (Data model, functional)
- **Changes Needed**:
  - Add notificationAddress field to User model
  - Update profile form to include notification address
  - Display notification address in order details

### 3. ❌ Registration Form Auto-Capitalize & Password Visibility
- **Status**: Not started
- **Description**: 
  - Names don't auto-capitalize (should start with uppercase)
  - No password visibility toggle button
- **Affected Files**: `features/auth/register/register.component.ts`, `features/auth/register/register.component.html`
- **Priority**: MEDIUM (UX improvement)
- **Changes Needed**:
  - Add automatic capitalization to firstName/lastName inputs
  - Add show/hide password toggle icon

### 4. ❌ Page Scroll Position on Navigation
- **Status**: Not started
- **Description**: When navigating between pages, often start at bottom instead of top
- **Affected Files**: `app.component.ts` (or routing logic)
- **Priority**: HIGH (Core UX)
- **Changes Needed**:
  - Add scroll-to-top on route change globally
  - Ensure all navigations reset scroll position

### 5. ❌ Cart Deletion Notification Typo
- **Status**: Not started
- **Description**: Typo in cart removal/deletion notification message
- **Affected Files**: `features/cart/cart.component.html`, `features/cart/cart.component.ts`
- **Priority**: LOW (Minor UX)
- **Changes Needed**:
  - Correct the typo in deletion confirmation message

### 6. ❌ Comments Feature Missing
- **Status**: Not started
- **Description**: Cannot write comments on products; need reader and writer views
- **Affected Files**: 
  - New: `features/products/product-comments/`
  - `features/products/product-detail.component.ts`
  - `shared/models/index.ts`
  - `core/services/comment.service.ts` (new)
- **Priority**: HIGH (Feature requirement)
- **Changes Needed**:
  - Create Comment model (id, productId, userId, text, rating, timestamp)
  - Create CommentService with CRUD operations
  - Create product-comments component with reader/writer views
  - Integrate into product-detail page

### 7. ❌ Footer Typo & Twitter → X Logo
- **Status**: Not started
- **Description**: 
  - Typo in footer text
  - Twitter social link should be X (rebranding)
- **Affected Files**: `shared/components/footer/footer.component.ts`, `shared/components/footer/footer.component.html`
- **Priority**: LOW (Brand/cosmetic)
- **Changes Needed**:
  - Fix footer text typo
  - Replace 'twitter' with 'x' branding
  - Update icon to X logo

### 8. ❌ Address Fields Separation
- **Status**: Not started
- **Description**: Street and house number should be separate input fields (currently combined)
- **Affected Files**: 
  - `shared/models/index.ts` (Address model)
  - `features/profile/profile-settings.component.ts`
  - `features/checkout/checkout.component.ts`
  - `features/admin/users/admin-users.component.ts`
- **Priority**: HIGH (Data integrity, admin use)
- **Changes Needed**:
  - Split Address model: `street` and `houseNumber` separate fields
  - Update all address forms (profile, checkout, admin)
  - Update order display to show both fields

### 9. ❌ Payment Methods
- **Status**: Not started
- **Description**: Need multiple payment method options (PayPal, bank transfer, C.O.D., etc.)
- **Affected Files**: 
  - `shared/models/index.ts` (Order model)
  - `features/checkout/checkout.component.ts`
  - `features/orders/order-detail.component.ts`
- **Priority**: MEDIUM (Feature enhancement)
- **Changes Needed**:
  - Add paymentMethod enum to Order model
  - Add payment method selector to checkout form
  - Display selected payment method in order summary

### 10. ❌ Free Shipping Threshold Not Working
- **Status**: Not started
- **Description**: Shipping should be free for orders over 3500 Ft (currently not functioning)
- **Affected Files**: `features/checkout/checkout.component.ts`, `core/services/`.ts`, `features/cart/cart.component.ts`
- **Priority**: HIGH (Business logic, critical)
- **Changes Needed**:
  - Debug shipping cost calculation logic
  - Ensure cart total ≥ 3500 Ft triggers free shipping
  - Update checkout summary display
  - Verify cart subtotal includes all items correctly

### 11. ❌ Admin Users Page Mobile Collapse & Delete
- **Status**: Not started
- **Description**: 
  - Mobile view doesn't collapse user info like products page does
  - No delete option for users
- **Affected Files**: `features/admin/users/admin-users.component.ts`, `features/admin/users/admin-users.component.html`
- **Priority**: MEDIUM (Admin UX, functionality)
- **Changes Needed**:
  - Add mobile-responsive card layout (collapse/expand like products)
  - Add delete button/confirmation dialog for users
  - Update UserService with deleteUser() method if needed

### 12. ❌ Select Dropdown Transparent Background
- **Status**: Not started
- **Description**: Dropdown select elements have transparent background, making text hard to read
- **Affected Files**: `styles.scss`, component-level styles (admin pages)
- **Priority**: MEDIUM (Accessibility, readability)
- **Changes Needed**:
  - Add background color to Material select components
  - Ensure sufficient contrast for text readability
  - Apply fix globally via styles.scss or Material theme override

---

## Resolution Order (Recommended)

**Phase 1 - Critical Fixes (Do First):**
1. Issue #4 - Scroll position (affects all pages, quick fix)
2. Issue #10 - Free shipping (business logic, validation)
3. Issue #1 - Order summary (user-facing, high impact)

**Phase 2 - Data Model Changes:**
4. Issue #2 - Notification address (impacts profile, orders)
5. Issue #8 - Address field separation (impacts checkout, admin)
9. Issue #9 - Payment methods (order model)

**Phase 3 - Feature Work:**
6. Issue #6 - Comments feature (new feature, moderate effort)

**Phase 4 - UX/UI Polish:**
7. Issue #3 - Registration improvements
8. Issue #5 - Cart deletion typo
9. Issue #7 - Footer fixes
10. Issue #11 - Admin users page mobile
11. Issue #12 - Select dropdown styling

---

## Timeline

- **Today (2026-03-26)**: Phases 1 & 2 (Issues #1-5 minimum)
- **Tomorrow (2026-03-27)**: Phases 2, 3, 4 (Issues #6-12)
- **Final Testing**: 2026-03-27 PM
- **Merge to Main**: 2026-03-27 Evening
- **M1 Submission Deadline**: 2026-03-29 23:59 CET

---

## Notes

- All changes must maintain backward compatibility with localStorage data
- After each fix, run `npm run build` to verify no regressions
- Update test results in test-results/ folder
- Update MILESTONE_1_TRACKER.md after each phase completion
