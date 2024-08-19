import { HttpInterceptorFn } from '@angular/common/http';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  var newReq = req.clone({setHeaders:{"Authorization":"Bearer "+ localStorage.getItem('token')}})
  return next(newReq);
};
