import React, {useContext, useState,useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

import {InputField} from '../components/InputField';
import {Logo} from '../components/Logo';
import {useForm} from '../hooks/useForm';
import {styles} from '../theme/Theme';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const Register = ({navigation}: Props) => {
  const {action, email, pass, name} = useForm({email: '', pass: '', name: ''});
  const [formError, setError] = useState({field: 0, val: ''});
  const [loading, setLoading] = useState(false);
  const {signIn, error, clearError} = useContext(AuthContext);

  const registerHandler = () => {
    setLoading(true);
    if (name.length < 5) {
      setError({field: 1, val: 'Name is too short'});
    } else if (!email.includes('@') || email.length < 6) {
      setError({field: 2, val: 'Email is invalid'});
    } else if (pass.length < 5) {
      setError({field: 3, val: 'Password is too short'});
    } else {
      setError({field: 0, val: ''});
      signIn({correo: email, password: pass, nombre: name, rol: 'USER_ROLE'});
    }
  };

  if((formError.field !== 0 || error) && loading){
    setLoading(false);
  };

  useEffect(()=>{
    if(error){
      Alert.alert('Register Failed', error, [{
        text: 'Ok',
        onPress: clearError,
      }])
    }
  },[error]);

  return (
    <>
      {/*  content  */}

      <ScrollView style={{backgroundColor: 'purple', flex: 1}}>
        <View style={styles.formContainer}>
          <Logo />

          <Text style={styles.title}>Register</Text>

          <Text style={styles.label}>Name</Text>
          <InputField
            email={true}
            placeHolder="Test Testing"
            onChange={value => action('name', value)}
          />
          {formError.field === 1 && (
            <Text style={styles.errorTxt}>{formError.val}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <InputField
            email={true}
            placeHolder="test1@testing.com"
            onChange={value => action('email', value)}
          />
          {formError.field === 2 && (
            <Text style={styles.errorTxt}>{formError.val}</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <InputField onChange={value => action('pass', value)} />
          {formError.field === 3 && (
            <Text style={styles.errorTxt}>{formError.val}</Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={registerHandler}>
              <Text style={{...styles.title, fontSize: 16, marginVertical: 10}}>
                Register
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

          <View style={styles.backToLogin}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#FFFFFF', fontSize: 16}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
