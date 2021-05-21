import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Authorization': `Bearer mitoken`,
            },
        });

        return next.handle(req);
    }
}