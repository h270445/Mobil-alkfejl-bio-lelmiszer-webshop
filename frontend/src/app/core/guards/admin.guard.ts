import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (!authService.isLoggedIn) {
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  if (authService.isAdmin) {
    return true;
  }

  snackBar.open('Nincs jogosultságod az admin felülethez.', 'Bezárás', {
    duration: 4000,
    panelClass: ['warn-snack']
  });

  // Only allow safe internal redirects; otherwise fallback to home.
  const previousUrl =
    router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString() ?? '';

  const canRedirectBack =
    previousUrl.startsWith('/') &&
    previousUrl !== state.url &&
    !previousUrl.startsWith('/admin');

  return router.parseUrl(canRedirectBack ? previousUrl : '/');
};
