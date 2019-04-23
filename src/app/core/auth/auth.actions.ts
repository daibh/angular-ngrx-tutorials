import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { MainMenuItems } from 'src/app/shared/menu-items/menu-items';
import { ICredentials } from 'src/app/shared/model/credentials.model';
import { IUser } from 'src/app/shared/model/user.model';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGOUT = '[Auth] Logout',
  AUTHENTICATE = '[Login] Authenticate',
  AUTHENTICATE_SUCCESS = '[Login] Authenticate Success',
  AUTHENTICATE_ERROR = '[Login] Authenticate Error',
  FETCH_ACCOUNT = '[Account] Fetch',
  FETCH_ACCOUNT_SUCCESS = '[Account] Fetch Success',
  FETCH_ACCOUNT_ERROR = '[Account] Fetch Error',
  FETCH_ACCOUNT_MENU = '[Menu] Fetch',
  FETCH_ACCOUNT_MENU_SUCCESS = '[Menu] Fetch Success',
  FETCH_ACCOUNT_MENU_ERROR = '[Menu] Fetch Error',
  TAB_ADD_OR_ACTIVE = '[Tab] Add or active tab',
  TAB_REMOVE = '[Tab] remove tab',
  TAB_ACTIVE = '[Tab] Active tab'
}

export class ActionAuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ActionAuthenticate implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE;
  constructor(readonly payload: { credentials: ICredentials }) { }
}

export class ActionAuthenticateSuccess implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_SUCCESS;

  constructor(readonly payload: { token: string }) { }
}

export class ActionAuthenticateError implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class ActionFetchAccount implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT;
}

export class ActionFetchAccountSuccess implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT_SUCCESS;
  constructor(readonly payload: { account: IUser }) { }
}

export class ActionFetchAccountError implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class ActionFetchAccountMenu implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT_MENU;
}

export class ActionFetchAccountMenuSuccess implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT_MENU_SUCCESS;
  constructor(readonly payload: { menu: MainMenuItems[] }) { }
}

export class ActionFetchAccountMenuError implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT_MENU_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class ActionLoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
}

export class ActionAddOrActiveTab implements Action {
  readonly type = AuthActionTypes.TAB_ADD_OR_ACTIVE;
  constructor(readonly payload: MainMenuItems) { }
}

export class ActionRemoveTab implements Action {
  readonly type = AuthActionTypes.TAB_REMOVE;
  constructor(readonly payload: MainMenuItems) { }
}

export class ActionActiveTab implements Action {
  readonly type = AuthActionTypes.TAB_ACTIVE;
  constructor(readonly payload: string) { }
}

export type AuthActions =
  | ActionAuthLogin
  | ActionAuthLogout
  | ActionAuthenticate
  | ActionAuthenticateSuccess
  | ActionAuthenticateError
  | ActionFetchAccount
  | ActionFetchAccountSuccess
  | ActionFetchAccountError
  | ActionFetchAccountMenu
  | ActionFetchAccountMenuSuccess
  | ActionFetchAccountMenuError
  | ActionLoginSuccess
  | ActionAddOrActiveTab
  | ActionRemoveTab
  | ActionActiveTab;
