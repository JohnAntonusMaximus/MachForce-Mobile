import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Communications from 'react-native-communications';
import { CardSection } from './common';


class CommunicationsModal extends Component {

    onCallPress(){
        Communications.phonecall(this.props.phone, false);
    }

    onTextPress(){
        Communications.text(this.props.phone);
    }


    render(){

        const { containerStyle, cardSectionStyle, textStyle, headerStyle, touchableStyle } = styles;

        return(
                <Modal
                transparent
                animation="slide"
                visible={this.props.visible}
                onRequestClose={() => {}}
                >
                    <View style={containerStyle}>
                        <CardSection style={cardSectionStyle}>
                            <Text style={headerStyle}>{this.props.phone}</Text>
                        </CardSection>
                        
                        <TouchableOpacity style={touchableStyle} onPress={this.onCallPress.bind(this)}>
                            <CardSection style={cardSectionStyle}>
                                <Text style={textStyle}>Call</Text>
                            </CardSection>
                        </TouchableOpacity>

                        <TouchableOpacity style={touchableStyle} onPress={this.onTextPress.bind(this)}>
                            <CardSection style={cardSectionStyle}>
                                <Text style={textStyle} >Text</Text>
                            </CardSection>
                        </TouchableOpacity>

                        <TouchableOpacity style={touchableStyle} onPress={this.props.onCancel}>
                            <CardSection style={cardSectionStyle}>
                                <Text style={textStyle} >Cancel</Text>
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

export default CommunicationsModal;