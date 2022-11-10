import 'react-native-gesture-handler';
import React from 'react';
import {StackNav} from './src/navigation/StackNav';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/AuthContext';
import {ProductsCtxProvider} from './src/context/ProductsContext';
import {Provider} from './src/context/posterContext';

export const App = () => {
  return (
    <AuthProvider>
      <ProductsCtxProvider>
        <Provider>
          <NavigationContainer>
            <StackNav />
          </NavigationContainer>
        </Provider>
      </ProductsCtxProvider>
    </AuthProvider>
  );
};
