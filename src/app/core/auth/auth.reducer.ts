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
    default:
      return { ...state };
  }
}
