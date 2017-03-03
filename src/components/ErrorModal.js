import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Communications from 'react-native-communications';
import { CardSection } from './common';


class ErrorModal extends Component {


    render(){

            const { containerStyle, cardSectionStyle, textStyle, headerStyle, touchableStyle, subtextStyle } = styles;

        return(
                <Modal
                transparent
                animation="slide"
                visible={this.props.visible}
                onRequestClose={() => {}}
                >
                    <View style={containerStyle}>
                        <CardSection style={cardSectionStyle}>
                            <Text style={headerStyle}>Whoops! Slight Issue...</Text>
                        </CardSection>
                        <CardSection style={cardSectionStyle}>
                            <Text style={subtextStyle}>{this.props.errorMessage ? this.props.errorMessage : 'Some error!' }</Text>
                        </CardSection>

                        <TouchableOpacity style={touchableStyle} onPress={this.props.onOkPress}>
                            <CardSection style={cardSectionStyle}>
                                <Text style={textStyle} >Ok</Text>
                            </CardSection>
                        </TouchableOpacity>
                    </View>
                </Modal>
        );
    }
}

const styles = {
    cardSectionStyle: {
        flex: 1,
        justifyContent: 'center'
    },
    headerStyle:{
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 40,
        paddingBottom: 10
    },
     subtextStyle:{
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 40,
        paddingBottom: 10
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
        paddingBottom: 10
    },
    touchableStyle: {
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
};

export default ErrorModal;