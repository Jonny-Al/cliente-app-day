import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        req.clone({ headers: req.headers.set('Authorization', 'Bearer MI-AUTH-TOKEN') });
        req.clone({ headers: req.headers.set('Access-Control-Allow-Headers', 'Content-Type') });

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('Evento: ', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {

                console.log('Error de HttpInterceptor: ', error);
                return throwError(error);
            }));
    }
}