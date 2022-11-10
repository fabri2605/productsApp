import React, {useReducer, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cafeApi from '../api/cafeApi';
import {loginData, LoginResponse, Usuario} from '../interfaces/appInterfaces';
import {authReducer, AuthState} from './AuthReducer';

type initials = {
  error: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'non-authenticated';
  signIn: (obj: loginData) => void;
  signUp: (obj: LoginResponse) => void;
  logOut: () => void;
  clearError: () => void;
};

const initialState: AuthState = {
  error: '',
  token: null,
  user: null,
  status: 'checking',
};

export const AuthContext = createContext({} as initials);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await AsyncStorage.getItem('data');
    if (res) {
      return signUp(JSON.parse(res));
    }
    dispatch({type: 'notAuthenticated'});
  };

  const signIn = async ({correo, password, nombre, rol}: loginData) => {
    try {
      if (nombre && rol) {
        // register
        const {data} = await cafeApi.post<LoginResponse>('/usuarios', {
          correo,
          password,
          nombre,
          rol,
        });
        signUp({token: data.token, usuario: data.usuario});
        await AsyncStorage.setItem(
          'data',
          JSON.stringify({token: data.token, usuario: data.usuario}),
        );
      } else {
        // login
        const {data} = await cafeApi.post<LoginResponse>('/auth/login', {
          correo,
          password,
        });
        signUp({token: data.token, usuario: data.usuario});
        await AsyncStorage.setItem(
          'data',
          JSON.stringify({token: data.token, usuario: data.usuario}),
        );
      }
      clearError();
    } catch (error: any) {
      if (nombre && rol) {
        dispatch({type: 'addError', payload: error.response.data.errors[0].msg});
      } else {
        dispatch({type: 'addError', payload: error.response.data.msg});
      }
    }
  };

  const signUp = async ({token, usuario}: LoginResponse) => {
    dispatch({
      type: 'signUp',
      payload: {token: token, user: usuario},
    });
    try {
      clearError();
    } catch (error: any) {
      dispatch({type: 'addError', payload: error.response.data});
    }
  };

  const logOut = async () => {
    dispatch({type: 'logout'});
    await AsyncStorage.removeItem('data');
  };

  const clearError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{...state, signIn, clearError, logOut, signUp}}>
      {children}
    </AuthContext.Provider>
  );
};
