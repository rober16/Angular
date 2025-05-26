import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const terminosGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const acepto = localStorage.getItem('acepto') === 'true';
  if (!acepto) {
    router.navigate(['/terminos']);
    return false;
  }
  return true;
};
