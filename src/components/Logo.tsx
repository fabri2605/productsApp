import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export const Logo = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/react-logo-white.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  img: {
    width: 110,
    height: 100,
    marginVertical: 20
  },
});
