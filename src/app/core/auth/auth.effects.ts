import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ActionAuthenticate, ActionAuthenticateError, ActionAuthenticateSuccess, ActionAuthLogin, ActionAuthLogout, ActionFetchAccount, ActionFetchAccountError, ActionFetchAccountMenu, ActionFetchAccountMenuError, ActionFetchAccountMenuSuccess, ActionFetchAccountSuccess, ActionLoginSuccess, AuthActionTypes, ActionAddOrActiveTab, ActionRemoveTab } from './auth.actions';
import { AuthService } from './auth.service';
import { AUTH_KEY, AUTH_TOKEN, AUTH_ACCOUNT, AUTH_MENU, AUTH_TABS } from './auth.constants';
import { MainMenuItems } from 'src/app/shared/menu-items/menu-items';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private service: AuthService,
    public store: Store<AppState>
  ) { }

  @Effect({ dispatch: false })
  login = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    tap(() => {
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      this.localStorageService.removeItem(AUTH_TOKEN);
      this.localStorageService.removeItem(AUTH_ACCOUNT);
      this.localStorageService.removeItem(AUTH_MENU);
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.router.navigate(['auth', 'login']);
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      this.localStorageService.removeItem(AUTH_TOKEN);
      this.localStorageService.removeItem(AUTH_ACCOUNT);
      this.localStorageService.removeItem(AUTH_MENU);
      this.localStorageService.removeItem(AUTH_TABS);
    })
  );

  @Effect()
  authenticate = () =>
    this.actions$.pipe(
      ofType<ActionAuthenticate>(AuthActionTypes.AUTHENTICATE),
      exhaustMap((action: ActionAuthenticate) =>
        this.service.authenticate(action.payload.credentials).pipe(
          mergeMap(token => [
            new ActionAuthenticateSuccess({ token }),
            new ActionFetchAccount(),
            new ActionFetchAccountMenu(),
            new ActionLoginSuccess()
          ]),
          catchError(error => of(new ActionAuthenticateError({ error })))
        )
      )
    );

  @Effect()
  fetchAccount = () =>
    this.actions$.pipe(
      ofType<ActionFetchAccount>(AuthActionTypes.FETCH_ACCOUNT),
      switchMap(() =>
        this.service.fetch().pipe(
          map(account => new ActionFetchAccountSuccess({ account })),
          catchError(error => of(new ActionFetchAccountError({ error })))
        )
      )
    );

  @Effect({ dispatch: false })
  storeAccount = () =>
    this.actions$.pipe(
      ofType<ActionFetchAccountSuccess>(AuthActionTypes.FETCH_ACCOUNT_SUCCESS),
      tap(action => {
        this.localStorageService.setItem(AUTH_ACCOUNT, action.payload.account);
      })
    );

  @Effect()
  fetchAccountMenu = () =>
    this.actions$.pipe(
      ofType<ActionFetchAccountMenu>(AuthActionTypes.FETCH_ACCOUNT),
      switchMap(() =>
        this.service.fetchMenu().pipe(
          map(menu => new ActionFetchAccountMenuSuccess({ menu })),
          catchError(error => of(new ActionFetchAccountMenuError({ error })))
        )
      )
    );

  @Effect({ dispatch: false })
  storeAccountMenu = () =>
    this.actions$.pipe(
      ofType<ActionFetchAccountMenuSuccess>(
        AuthActionTypes.FETCH_ACCOUNT_MENU_SUCCESS
      ),
      tap(action => {
        this.localStorageService.setItem(AUTH_MENU, action.payload.menu);
      })
    );

  @Effect({ dispatch: false })
  loginSuccess = this.actions$.pipe(
    ofType<ActionLoginSuccess>(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => this.router.navigate(['']))
  );

  @Effect({ dispatch: false })
  addOrActiveTab = () =>
    this.actions$.pipe(
      ofType<ActionAddOrActiveTab>(
        AuthActionTypes.TAB_ADD_OR_ACTIVE
      ),
      tap(action => {
        const tabs: MainMenuItems[] = Object.assign([], this.localStorageService.getItem(AUTH_TABS));
        const index = tabs.findIndex(t => t.type === 'tab' && t.state === action.payload.state && t.mainState === action.payload.mainState);
        if (index === -1) {
          tabs.push(action.payload);
          this.localStorageService.setItem(AUTH_TABS, tabs);
        }
      })
    );

  @Effect({ dispatch: false })
  removeTab = () =>
    this.actions$.pipe(
      ofType<ActionRemoveTab>(
        AuthActionTypes.TAB_REMOVE
      ),
      tap(action => {
        const tabs: MainMenuItems[] = Object.assign([], this.localStorageService.getItem(AUTH_TABS));
        const index = tabs.findIndex(t => t.type === 'tab' && t.state === action.payload.state && t.mainState === action.payload.mainState);
        if (index !== -1) {
          tabs.splice(index, 1);
          this.localStorageService.setItem(AUTH_TABS, tabs);
        }
      })
    );

}
