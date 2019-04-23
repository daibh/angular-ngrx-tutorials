import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AuthActionTypes, ActionAuthLogin, ActionAuthLogout } from './auth.actions';
import { AUTH_KEY, AUTH_TOKEN, AUTH_ACCOUNT, AUTH_MENU, AUTH_TABS } from './auth.constants';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    public store: Store<AppState>
  ) { }

  @Effect({ dispatch: false })
  login = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    tap(() => {
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true });
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
    })
  );
}
