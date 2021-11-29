import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import jsSHA from 'jssha';
import { environment } from 'src/environments/environment';
import { GlobalService } from './app/services/global.service';
import { finalize, tap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private globalService: GlobalService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.globalService.openLoadingBar();
    // 組合 Header 並加密放到 Request 內
    const dateString = new Date().toUTCString();
    const shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.setHMACKey(environment.appKey, 'TEXT');
    shaObj.update(`x-date: ${dateString}`)
    const HMAC = shaObj.getHMAC('B64');

    const authorization = `hmac username="${environment.appId}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`

    const newRequest = request.clone({
      setHeaders: {
        Authorization: authorization,
        'X-Date': dateString
      },
    });
    return next.handle(newRequest);
    // return next.handle(newRequest).pipe(
    //   tap(() => this.globalService.openLoadingBar()),
    //   catchError((val) => {
    //     this.globalService.closeLoadBar();
    //     return of(val);
    //   }),
    //   finalize(() => this.globalService.closeLoadBar()));
  }
}
