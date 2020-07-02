import { createReducer, on } from '@ngrx/store';
import { addUser } from './actions';
import { state } from '@angular/animations';
import { User } from '../../app/models/usuario.model';
import { AppState } from './model';

export const initialState: AppState = {
  user: null
}
 
const _userReducer = createReducer(initialState,
  on(addUser, (state, { user }) => ({...state, user: { ...state.user, ...user } })),
);
 
export function userReducer(state, action) {
  return _userReducer(state, action);
}