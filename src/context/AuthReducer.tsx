import {Usuario} from '../interfaces/appInterfaces';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'non-authenticated';
  error: string;
  token: string | null;
  user: Usuario | null;
}

type authAction =
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'checking'}
  | {type: 'logout'};

export const authReducer = (
  state: AuthState,
  action: authAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        error: action.payload,
        status: 'non-authenticated',
        token: null,
        user: null,
      };
    case 'signUp':
      return {
        error: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'logout':
      return {
        error: '',
        status: 'non-authenticated',
        token: null,
        user: null,
      };
    case 'notAuthenticated':
      return {
        ...state,
        status: 'non-authenticated',
        token: null,
        user: null,
      };
    case 'checking':
      return {
        ...state,
        status: 'checking',
      };
    case 'removeError':
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};
