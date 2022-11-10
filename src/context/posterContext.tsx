import React from 'react';
import {useState} from 'react';

interface Default {
  colors: {
    primary: string;
    secondary: string;
  };
  changeColors: (primary: string, secondary: string) => void;
  prevColors: {
    primary: string;
    secondary: string;
  };
  changePrevColors: (primary: string, secondary: string) => void;
}

export const context = React.createContext({} as Default);

export const Provider = ({children}: any) => {
  const [colors, setColors] = useState({
    primary: 'transparent',
    secondary: 'transparent',
  });
  const [prevColors, setPrevColors] = useState({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const changeColors = (primary: string, secondary: string) => {
    setColors({primary, secondary});
  };
  const changePrevColors = (primary: string, secondary: string) => {
    setPrevColors({primary, secondary});
  };

  const store = {
    colors,
    changeColors,
    prevColors,
    changePrevColors,
  };

  return <context.Provider value={store}>{children}</context.Provider>;
};
