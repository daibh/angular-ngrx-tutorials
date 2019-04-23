import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/core.state';
import { UserState, userReducer } from './single-page-on/tabs/reducers/user.reducer';


export const FEATURE_NAME = 'admin';
export const selectAdmin = createFeatureSelector<State, AdminState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<AdminState> = {
  userState: userReducer
};

export interface AdminState {
  userState: UserState
}

export interface State extends AppState {
  admin: AdminState;
}
