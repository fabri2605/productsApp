import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';

import {Background} from '../components/Background';
import {InputField} from '../components/InputField';
import {Logo} from '../components/Logo';
import {styles} from '../theme/Theme';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const Login = ({navigation}: Props) => {
  const {action, email, pass} = useForm({email: '', pass: ''});
  const [formError, setError] = useState({field: 0, val: ''});
  const [loading, setLoading] = useState(false);
  const {signIn, error, user, clearError} = useContext(AuthContext);

  const loginHandler = () => {
    setLoading(true);
    if (!email.includes('@') || email.length < 6) {
      setError({field: 1, val: 'Email is invalid'});
    } else if (pass.length < 5) {
      setError({field: 2, val: 'Password is too short'});
    } else {
      setError({field: 0, val: ''});
      signIn({correo: email, password: pass});
    }
  };

  if((formError.field !== 0 || error) && loading){
    setLoading(false);
  };

  useEffect(()=>{
    if(error){
      Alert.alert('Login Failed', error, [{
        text: 'Ok',
        onPress: clearError,
      }])
    }
  },[error]);

  return (
    <>
      {/*  background  */}

      <Background />

      {/*  content  */}

      <ScrollView style={{flex: 1}}>
        <View style={styles.formContainer}>
          <Logo />

          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>Email</Text>
          <InputField
            email={true}
            placeHolder="test1@testing.com"
            onChange={value => action('email', value)}
          />
          {formError.field === 1 && (
            <Text style={styles.errorTxt}>{formError.val}</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <InputField onChange={value => action('pass', value)} />
          {formError.field === 2 && (
            <Text style={styles.errorTxt}>{formError.val}</Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={loginHandler}>
              <Text style={{...styles.title, fontSize: 16, marginVertical: 10}}>
                Login
              </Text>
            </TouchableOpacity>
            {loading && (
              <ActivityIndicator
                style={styles.loader}
                color={'white'}
                size={30}
              />
            )}
          </View>

          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Register')}>
              <Text style={{color: '#FFFFFF', fontSize: 16}}>
                Dont have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
