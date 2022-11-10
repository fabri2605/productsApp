import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Background = () => {
    return (
        <View style={s.container}>
            
        </View>
    );
}

const s = StyleSheet.create({
container : {
    position: 'absolute',
    backgroundColor: 'purple',
    width: 1000,
    height: 1200,
    top: -420,
    transform: [{rotate: '-70deg'}]
}
});