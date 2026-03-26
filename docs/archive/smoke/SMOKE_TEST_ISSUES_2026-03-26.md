# Smoke Test & User Testing Issues - March 26, 2026

Status: Archived (closed report)
Archive date: 2026-03-26

## Overview
12 issues identified during smoke testing and user testing. All must be resolved before M1 submission (2026-03-29 23:59 CET).

## Issue Tracking

### 1. ✅ Order Summary After Checkout
- **Status**: Completed (2026-03-26)
- **Description**: After order submission, the summary page has a typo and missing detailed summary information
- **Affected Files**: `features/checkout/checkout.component.ts`
- **Priority**: HIGH (User-facing, critical feature)
- **Changes Needed**: 
  - [x] Fix typo in success message (`Továbbá Vásárlás` -> `További vásárlás`)
  - [x] Add detailed order summary with items, quantities, prices, shipping cost

### 2. ✅ Missing Notification Address
- **Status**: Completed (2026-03-26)
- **Description**: Profile page and order details missing notification/shipping address field
- **Affected Files**: `features/profile/profile-settings.component.ts`, `shared/models/index.ts`, `features/orders/order-detail.component.ts`
- **Priority**: HIGH (Data model, functional)
- **Changes Needed**:
  - [x] Add notificationAddress field to User and Order models
  - [x] Update profile form to include notification address
  - [x] Display notification address in order details

### 3. ✅ Registration Form Auto-Capitalize & Password Visibility
- **Status**: Completed (2026-03-26)
- **Description**: 
  - Names don't auto-capitalize (should start with uppercase)
  - No password visibility toggle button
- **Affected Files**: `features/auth/register/register.component.ts`, `features/auth/register/register.component.html`
- **Priority**: MEDIUM (UX improvement)
- **Changes Needed**:
  - [x] Add automatic capitalization to firstName/lastName inputs
  - [x] Add show/hide password toggle controls

### 4. ✅ Page Scroll Position on Navigation
- **Status**: Completed (2026-03-26)
- **Description**: When navigating between pages, often start at bottom instead of top
- **Affected Files**: `main.ts` (router provider configuration)
- **Priority**: HIGH (Core UX)
- **Changes Needed**:
  - [x] Add scroll-to-top on route change globally (`withInMemoryScrolling`)
  - [x] Ensure all navigations reset scroll position (`scrollPositionRestoration: 'top'`)

### 5. ✅ Cart Deletion Notification Typo
- **Status**: Completed (2026-03-26)
- **Description**: Typo in cart removal/deletion notification message
- **Affected Files**: `features/cart/cart.component.html`, `features/cart/cart.component.ts`
- **Priority**: LOW (Minor UX)
- **Changes Needed**:
  - [x] Correct removal notification message text
  - [x] Improve clear-cart confirmation text

### 6. ✅ Comments Feature (Ratings + Text + Filter)
- **Status**: Completed (2026-03-26)
- **Description**: Cannot write comments on products; need reader and writer views
- **Affected Files**: 
  - New: `features/products/product-comments/`
  - `features/products/product-detail.component.ts`
  - `shared/models/index.ts`
  - `core/services/comment.service.ts` (new)
- **Priority**: HIGH (Feature requirement)
- **Changes Needed**:
  - [x] Create Comment model (id, productId, userId, text, rating, timestamp)
  - [x] Create CommentService with CRUD operations
  - [x] Integrate comment reader/writer view into product detail page
  - [x] Add rating filter (All, 5⭐, 4⭐, 3⭐, 2⭐, 1⭐)

### 7. ✅ Footer Typo & Twitter → X Logo
- **Status**: Completed (2026-03-26)
- **Description**: 
  - Typo in footer text
  - Twitter social link should be X (rebranding)
- **Affected Files**: `shared/components/footer/footer.component.ts`, `shared/components/footer/footer.component.html`
- **Priority**: LOW (Brand/cosmetic)
- **Changes Needed**:
  - [x] Fix footer typo and wording cleanup
  - [x] Replace 'Twitter' with 'X' branding
  - [x] Update icon to X logo

### 8. ✅ Address Fields Separation
- **Status**: Completed (2026-03-26)
- **Description**: Street and house number should be separate input fields (currently combined)
- **Affected Files**: 
  - `shared/models/index.ts` (Address model)
  - `features/profile/profile-settings.component.ts`
  - `features/checkout/checkout.component.ts`
  - `features/admin/users/admin-users.component.ts`
- **Priority**: HIGH (Data integrity, admin use)
- **Changes Needed**:
  - [x] Split Address model: `street` and `houseNumber` separate fields
  - [x] Update all address forms (profile, checkout, admin-save flow)
  - [x] Update order display to show both fields

### 9. ✅ Payment Methods
- **Status**: Completed (2026-03-26)
- **Description**: Need multiple payment method options (PayPal, bank transfer, C.O.D., etc.)
- **Affected Files**: 
  - `shared/models/index.ts` (Order model)
  - `features/checkout/checkout.component.ts`
  - `features/orders/order-detail.component.ts`
- **Priority**: MEDIUM (Feature enhancement)
- **Changes Needed**:
  - [x] Add `paymentMethod` type to Order model
  - [x] Add payment method selector to checkout form (card, PayPal, bank transfer, COD)
  - [x] Display selected payment method in success summary and order details (user + admin)

### 10. ✅ Free Shipping Threshold Not Working
- **Status**: Completed (2026-03-26)
- **Description**: Shipping should be free for orders over 3500 Ft (currently not functioning)
- **Affected Files**: `features/checkout/checkout.component.ts`
- **Priority**: HIGH (Business logic, critical)
- **Changes Needed**:
  - [x] Debug shipping cost calculation logic
  - [x] Preserve submitted shipping values on success screen after cart clear
  - [x] Update checkout summary display to use submitted totals
  - [x] Verify threshold logic remains `>= 3500` => free shipping

### 11. ✅ Admin Users Page Mobile Collapse & Delete
- **Status**: Completed (2026-03-26)
- **Description**: 
  - Mobile view doesn't collapse user info like products page does
  - No delete option for users
- **Affected Files**: `features/admin/users/admin-users.component.ts`, `features/admin/users/admin-users.component.html`
- **Priority**: MEDIUM (Admin UX, functionality)
- **Changes Needed**:
  - [x] Add mobile-responsive card layout (collapse/expand like products)
  - [x] Add delete button/confirmation dialog for users
  - [x] Update user service with admin delete operation

### 12. ✅ Select Dropdown Transparent Background
- **Status**: Completed (2026-03-26)
- **Description**: Dropdown select elements have transparent background, making text hard to read
- **Affected Files**: `styles.scss`, component-level styles (admin pages)
- **Priority**: MEDIUM (Accessibility, readability)
- **Changes Needed**:
  - [x] Add background color to Material select components
  - [x] Ensure sufficient contrast for text readability
  - [x] Apply fix globally via styles.scss (Material theme override)

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

### 2026-03-26 Update

- Scroll-to-top behavior was reinforced globally via router navigation handling to avoid mid-page landing on route changes.
- Comments/reviews flow was implemented with create + list + rating-based filter.
- Footer branding and typo cleanups were completed (Twitter -> X).
- Dropdown transparency fix is active globally.
- All smoke-test issues are implemented for M1 scope.
- Open note: if old localStorage data exists, comment seed/mocks may require storage reset to verify initial seeded set.
