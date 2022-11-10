import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Background} from '../components/Background';
import {AuthContext} from '../context/AuthContext';
import {styles} from '../theme/Theme';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const Protected = ({navigation}: Props) => {
  const {token, user, logOut} = useContext(AuthContext);

  const logOutHandler = () => {
    logOut();
  };

  return (
    <>
      <Background />

      <View style={styles.formContainer}>
        <Text style={styles.info}>{JSON.stringify(user, null, 5)}</Text>
        <Text>{JSON.stringify(token)}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{...styles.button, backgroundColor: '#cc3917'}}
            activeOpacity={0.8}
            onPress={logOutHandler}>
            <Text style={{...styles.title, fontSize: 16, marginVertical: 10}}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
