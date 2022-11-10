import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface Props {
  placeHolder?: string;
  onChange: (e: string) => void;
  email?: boolean;
}

export const InputField = ({placeHolder, email, onChange}: Props) => {
  return (
    <TextInput
      placeholder={placeHolder}
      keyboardType={email ? 'email-address' : 'default'}
      onChangeText={e => onChange(e)}
      style={styles.input}
      selectionColor={'black'}
      autoCapitalize={'none'}
      autoCorrect={false}
      secureTextEntry={true}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    borderRadius: 5,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 9,
    paddingLeft: 10,
  },
});
