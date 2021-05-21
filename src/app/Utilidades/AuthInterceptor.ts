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
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIxTHBteTFfLWliRkxwQXFSZndLUzZaQmpLWUJ4VVBaSmpYcmpGTVBOdzNzIn0.eyJleHAiOjE2MjE1Njk2MjksImlhdCI6MTYyMTU2OTMyOSwianRpIjoiNTE0ODQ3ZDctY2IxMy00NTgyLTgyNjAtMWVjYWVmY2M0YTBiIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL3R1dG9yaWFsIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjRlMGIxN2U1LTM1Y2QtNGE5NS1hMWM5LTNjZWFiNWRkMjdhZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwaS1yZXN0LWJhY2tlbmQiLCJzZXNzaW9uX3N0YXRlIjoiNjEyYjU2NDctNTE0Ni00OWMwLTg5ODMtYTUwNGFlNWJmMjc3IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJyZWFsbS11c2VyIiwicmVhbG0tYWRtaW4iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJBbGVqYW5kcm8gR2FyY2lhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJnaXZlbl9uYW1lIjoiQWxlamFuZHJvIiwiZmFtaWx5X25hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImFAYS5jb20ifQ.JegWh-wj1QLCDqEWb9Gx4XNaG0x0uDAgTKhkhoK9hqpLmCm6Ox5_kyIbSL1fdBQcGbEKBA_w_UcYeZmiUPXSQ25BeJEiu6Qd8tBjSVVALY0gB4WICm8EFjTpJ7sjvaqU0RzRrVWQnQ8-pPgGMpvwrQICu3B35NZnnrpNm0id01u2770G_bYa9o5UGwljVuHyjF2_kOPzp5HZSqGDUrhDDW24BILZKZjG4yhOoLGPHI_aP_11S1Km7wYNLYkdR3g0mJjWBwqVyWUVyAjFR1VQq3R9DhT_tew_nUhMuPSkmh0Ts_8pbaQVh4WBLAaXDrWrCkPUSmJZHrfyGmXfjvR5fA',
            },
        });

        return next.handle(req);
    }
}