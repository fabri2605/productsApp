import React, {useContext, useEffect} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {context} from '../context/posterContext';
import {useFade} from '../hooks/useFade';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const GradientView = ({children}: Props) => {
  const {colors, prevColors, changePrevColors} = useContext(context);

  const {fadeIn, fadeOut, opacity} = useFade(0);

  useEffect(() => {
    fadeIn(()=>{
      changePrevColors(colors.primary, colors.secondary);
      fadeOut();
    });
  }, [colors]);

  return (
    <View style={{flex:1}}>
      <LinearGradient
        colors={[prevColors.primary, prevColors.secondary, 'white']}
        style={{...StyleSheet.absoluteFillObject}}
        //changed
        start={{x: 0.5, y: 0.8}}
        end={{x: 0.2, y: 0.2}}
      />
      <Animated.View
        style={{...StyleSheet.absoluteFillObject, opacity: opacity}}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, 'white']}
          style={{...StyleSheet.absoluteFillObject}}
          start={{x: 0.8, y: 0.8}}
          end={{x: 0.2, y: 0.2}}
        />
      </Animated.View>
      {children}
    </View>
  );
};
