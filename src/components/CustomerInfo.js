import React from 'react';
import { View, Text } from 'react-native';

const CustomerInfo = ({ label, value, customStyle }) => {
    const { textStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={[containerStyle, customStyle]}>
            <Text style={labelStyle}>{ label }</Text>
            <Text style={[textStyle, customStyle]}>{ value }</Text>
        </View>
    );
};

const styles = {
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    textStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export default CustomerInfo;