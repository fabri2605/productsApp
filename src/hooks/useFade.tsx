import React, { useRef } from 'react';
import {Animated} from 'react-native';

export const useFade = (num:number) => {
    const opacity = useRef(new Animated.Value(num)).current

    const fadeIn = (callback? : Function) => {
        Animated.timing(opacity, {
            useNativeDriver: true,
            duration: 1000,
            toValue: 1,
        }).start(()=> callback ? callback() : null);
    };
    const fadeOut = (num : number = 500) => {
        Animated.timing(opacity, {
            useNativeDriver: true,
            duration: num,
            toValue: 0,
        }).start();
    };

    return { opacity, fadeIn, fadeOut }
}