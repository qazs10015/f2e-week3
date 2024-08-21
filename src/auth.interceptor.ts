import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './app/services/global.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private globalService: GlobalService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');
    if (token && request.url.includes('tdx.transportdata.tw')) {
      const newRequest = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
      return next.handle(newRequest);
    }

    return next.handle(request);
    // return next.handle(newRequest).pipe(
    //   tap(() => this.globalService.openLoadingBar()),
    //   catchError((val) => {
    //     this.globalService.closeLoadBar();
    //     return of(val);
    //   }),
    //   finalize(() => this.globalService.closeLoadBar()));
  }
}
