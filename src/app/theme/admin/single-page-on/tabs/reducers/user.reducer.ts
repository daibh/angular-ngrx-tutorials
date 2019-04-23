
import { UserActions, UserActionTypes } from '../actions/user.actions';

export interface UserState {
  users?: any[];
}

export const initialState: UserState = {

};

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {

    case UserActionTypes.LoadUsers:
      return state;

    default:
      return state;
  }
}
