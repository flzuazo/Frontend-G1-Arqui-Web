import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { catchError, EMPTY, throwError } from 'rxjs';
/*
Este interceptor se encarga de añadir el token de autorización a las peticiones
Se genera con el comando ng g interceptor interceptor/login --skip-tests
Se registra en app.config.ts cómo parametro de provideHttpClient:
provideHttpClient(withInterceptors([loginInterceptor]))
 */

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  let authReq = req;

  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === HttpStatusCode.Forbidden) {
        alert('NO TIENES PERMISOS!');
        return EMPTY;
      } else {
        return throwError(() => error);
      }
    })
  );
};
