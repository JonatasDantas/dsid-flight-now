import { createAction, props } from '@ngrx/store';
import { User } from '../../app/models/usuario.model';

export const addUser = createAction('[User] add', props<{user: User}>());