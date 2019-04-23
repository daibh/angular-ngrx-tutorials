import { createSelector } from '@ngrx/store';
import { selectAuthState } from '../core.state';
import { AuthState } from './auth.models';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectMenu = createSelector(
  selectAuthState,
  (state: AuthState) => state.menu
);

export const selectTab = createSelector(
  selectAuthState,
  (state: AuthState) => state.tabs
);

export const selectActivedTab = createSelector(
  selectAuthState,
  (state: AuthState) => state.tab
);
