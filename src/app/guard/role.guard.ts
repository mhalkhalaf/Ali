import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  if(authService.isRole('Administrator')){
    return true
  }else {
    router.navigate(['/projecs'])
    return false
  }
 
};
