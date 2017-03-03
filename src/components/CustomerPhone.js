import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';


class CustomerPhone extends Component {
    
    render(){
        const { textStyle, labelStyle, containerStyle, touchableStyle } = styles;
        const { customStyle, label, value } = this.props;
        return (
            <View style={[containerStyle, customStyle]}>
                <Text style={labelStyle}>{ label }</Text>
                <TouchableOpacity style={touchableStyle} onPress={this.props.onPress}>
                    <Text style={[textStyle, customStyle]}>{ value }</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    touchableStyle: {
        flex: 2,
    },
    textStyle: {
        color: 'blue',
        textDecorationLine: 'underline',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export default CustomerPhone;