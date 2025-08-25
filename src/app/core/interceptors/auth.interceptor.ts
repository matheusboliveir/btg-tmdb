import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = environment.tmdbApiKey;
  const loading = inject(LoadingService);
  loading.show();
  if (req.url.includes(environment.apiUrl)) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authReq).pipe(finalize(() => loading.hide()));
  }
  return next(req).pipe(finalize(() => loading.hide()));
};
