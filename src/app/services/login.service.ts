import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login() {
    // const parameter = {
    //   grant_type: 'client_credentials',
    //   client_id: environment.appId,
    //   client_secret: environment.appKey,
    // };

    // const parameter = new FormData();
    // parameter.append('grant_type', 'client_credentials');
    // parameter.append('client_id', environment.appId);
    // parameter.append('client_secret', environment.appKey);

    const parameter = new URLSearchParams();
    parameter.set('grant_type', 'client_credentials');
    parameter.set('client_id', environment.appId); // Replace with your actual client ID
    parameter.set('client_secret', environment.appKey); // Replace with your actual client secret

    const auth_url =
      'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';

    return this.http.post<Login>(auth_url, parameter, {
      headers: {
        'Accept-Encoding': 'br,gzip',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/x-www-form-urlencoded',
      },
    });
  }
}
