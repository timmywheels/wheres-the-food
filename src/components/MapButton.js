import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const MapButton = (props) => {
    return (
        <View>
            <Text style={ styles.textStyle }>MapButton</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 20
    }
});

export default MapButton;
