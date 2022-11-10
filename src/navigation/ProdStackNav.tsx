import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Products} from '../screens/Products';
import { NewProduct } from '../screens/NewProduct';

export type ProductStackParams = {
    Products: undefined;
    NewProduct: { id: string, nombre: string };
}

const Stack = createStackNavigator<ProductStackParams>();

export const ProdStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen
        name="Products"
        component={Products as never}
        options={{title: 'Products'}}
      />
      <Stack.Screen
        name="NewProduct"
        component={NewProduct}
        options={{title: 'New Product'}}
      />
    </Stack.Navigator>
  );
};
