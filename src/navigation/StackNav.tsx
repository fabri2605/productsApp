import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Login} from '../screens/Login';
import {Register} from '../screens/Register';
import {AuthContext} from '../context/AuthContext';
import {Products} from '../screens/Products';
import {View, ActivityIndicator} from 'react-native';
import {styles} from '../theme/Theme';
import {NewProduct} from '../screens/NewProduct';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

export const StackNav = () => {
  const {status} = useContext(AuthContext);

  useEffect(()=>{
    SplashScreen.hide();
  },[]);

  if (status === 'checking')
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator color={'black'} size={30} />
      </View>
    );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {status === 'authenticated' ? (
        <>
          <Stack.Screen name="Products" component={Products as never} />
          <Stack.Screen
            name="NewProduct"
            component={NewProduct as never}
            options={{title: 'New Product'}}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};
