import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request Intercepted', req);

  if (req.method === 'POST') {
    const newRequest = req.clone({
      headers: new HttpHeaders({ token: '12345678dada' }),
    });
    return next(newRequest);
  }
  return next(req);
};
