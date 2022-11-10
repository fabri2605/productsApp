import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

export const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={ 50 } color={'black'} />
        </View>
    );
}

const styles = StyleSheet.create({
container : {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey'
}
});