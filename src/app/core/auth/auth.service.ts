import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_API_URL, API_ACCOUNT_LOGIN, API_ACCOUNT_GET_USER, API_ACCOUNT_GET_MENU_LIST } from 'src/app/app.constant';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AUTH_KEY, AUTH_TOKEN } from './auth.constants';
import { Store } from '@ngrx/store';
import { ActionAuthLogout } from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    protected localStorageService: LocalStorageService,
    private injector: Injector
  ) { }

  authenticate(credentials: any): Observable<string> {
    // let param = {
    //   email: `${credentials.username}@huudai.com`,
    //   password: `${credentials.password}@niwa`,
    //   rememberMe: credentials.rememberMe
    // };
    return this.httpClient
      .post(`${SERVER_API_URL}/${API_ACCOUNT_LOGIN}`, credentials, { observe: 'response' })
      .pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      const bearerToken = resp.body.token;
      let jwt = bearerToken;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        jwt = bearerToken.slice(7, bearerToken.length);
      }
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true });
      this.localStorageService.setItem(AUTH_TOKEN, jwt);
      // const countDown = setInterval(() => {
      //   console.log('countdount: ', parseJwt(jwt).exp * 1000 - Date.now());
      // }, 1000);
      // setTimeout(() => {
      //   this.injector.get(Store).dispatch(new ActionAuthLogout());
      //   // clearInterval(countDown);
      // }, parseJwt(jwt).exp * 1000 - Date.now());
      return jwt;
    }
  }

  fetch(): Observable<any> {
    return this.httpClient.get<any>(`${SERVER_API_URL}/${API_ACCOUNT_GET_USER}`);
  }

  fetchMenu(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${SERVER_API_URL}/${API_ACCOUNT_GET_MENU_LIST}`);
  }
}
