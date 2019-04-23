import { MainMenuItems } from 'src/app/shared/menu-items/menu-items';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { AuthState } from './auth.models';

export const initialState: AuthState = {
  isAuthenticated: false,
  loading: false
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  let oldTab: MainMenuItems[];
  let index: number;
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        isAuthenticated: false,
        loading: false,
        credentials: null,
        token: null,
        error: null,
        account: null,
        menu: null
      };

    case AuthActionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        loading: false,
        credentials: null,
        token: null,
        error: null,
        account: null,
        menu: null
      };
    case AuthActionTypes.AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        token: null,
        error: null,
        credentials: action.payload.credentials
      };

    case AuthActionTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
        error: null
      };

    case AuthActionTypes.AUTHENTICATE_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        error: action.payload.error
      };

    case AuthActionTypes.FETCH_ACCOUNT:
      return {
        ...state,
        loading: true
      };

    case AuthActionTypes.FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload.account
      };

    case AuthActionTypes.FETCH_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case AuthActionTypes.FETCH_ACCOUNT_MENU:
      return {
        ...state,
        loading: true
      };

    case AuthActionTypes.FETCH_ACCOUNT_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        menu: action.payload.menu
      };

    case AuthActionTypes.FETCH_ACCOUNT_MENU_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case AuthActionTypes.TAB_ADD_OR_ACTIVE:
      oldTab = Object.assign([], state.tabs);
      index = oldTab.findIndex(t => t.type === 'tab' && t.state === action.payload.state && t.mainState === action.payload.mainState);
      if (index === -1) {
        oldTab.push(action.payload);
      }
      return {
        ...state,
        tab: action.payload.code,
        tabs: [...oldTab]
      };
    case AuthActionTypes.TAB_REMOVE:
      oldTab = Object.assign([], state.tabs);
      index = oldTab.findIndex(t => t.type === 'tab' && t.state === action.payload.state && t.mainState === action.payload.mainState);
      if (index !== -1) {
        oldTab.splice(index, 1);
      }
      return {
        ...state,
        tab: action.payload.code,
        tabs: [...oldTab]
      };
    case AuthActionTypes.TAB_ACTIVE:
      return {
        ...state,
        tab: action.payload
      };
    default:
      return { ...state };
  }
}
