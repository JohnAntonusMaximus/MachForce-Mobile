import React from 'react';
import { View, Text, Image, Modal } from 'react-native';

const SplashScreen = ({ visible }) => {

    const { containerStyle, imageStyle, logoStyle, backgroundImageStyle, tagline, loadingStatus} = styles;

    const backgroundImage = require('../img/1.jpg');

    return(
        
            <View>
                <Modal
                animation="spring"
                visible={visible}
                onRequestClose={() => {}}
                >
                <Image source={backgroundImage} style={backgroundImageStyle} >
                    <View style={containerStyle}>
                        <Image source={require('../img/logo-transparent.png')} style={logoStyle}/>
                        <Text style={tagline}>Intelligent Customer Service</Text>
                        <Image source={require('../gif/loading-black.gif')} style={imageStyle}/>
                        <Text style={loadingStatus}>Launching satellites...</Text>
                    </View>
                </Image>
                </Modal>
            </View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1
    },
    backgroundImageStyle:{
        flex: 1,
        resizeMode: 'cover',
        width: undefined,
        height: undefined
    },
    imageStyle: {
        width: 200,
        height: 200
    },
    tagline:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 29
    },
    loadingStatus: {
        marginBottom: 50,
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoStyle:{
        alignSelf: 'center',
        width: 310,
        position: 'relative'
    }
};

export default SplashScreen;