import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const ContractorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  if(authService.isRole('Administrator') || authService.isRole('Contractors')){
    return true
  }else {
    router.navigate(['/projecs'])
    return false
  }
 
};
