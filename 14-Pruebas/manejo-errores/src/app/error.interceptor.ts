import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Aquí podrías activar un indicador de carga
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error interceptado:', error);
        // Aquí podrías mostrar una notificación al usuario
        return throwError(() => new Error(error.message));
      }),
      finalize(() => {
        // Aquí podrías desactivar el indicador de carga
      })
    );
  }
}