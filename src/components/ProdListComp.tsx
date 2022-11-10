import React from 'react';
import {Text, TouchableOpacity } from 'react-native';
import { Producto } from '../interfaces/appInterfaces';

interface Props {
    element: Producto;
    onPress: ()=> void;
}

export const ProdListComp = ({element, onPress} : Props) => {
    return (
        <>
              <TouchableOpacity
              activeOpacity={0.8}
                onPress={()=>onPress()}>
                <Text
                  style={{color: 'black', fontSize: 15, marginTop: 15}}>
                  {element.nombre}
                </Text>
              </TouchableOpacity>
            </>
    );
}