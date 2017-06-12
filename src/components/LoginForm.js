import React, { Component } from 'react';
import { Text, Image, AsyncStorage, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, rememberMeChanged, loginUser } from '../actions';
import SplashScreen from './SplashScreen';
import CustomCard from './CustomCard';
import CustomCardSection from './CustomCardSection';
import CheckBox from 'react-native-checkbox';


class LoginForm extends Component{

    state = { showSplashScreen: true};

    componentWillMount(){
       
            setTimeout(()=>{
                this.setState({ showSplashScreen: false});
            },7000);

            AsyncStorage.getItem('rememberMeEmail')
            .then((email) => this.props.emailChanged(email))
            .catch((err)=> console.log(err));

            AsyncStorage.getItem('rememberMePassword')
            .then((password) => this.props.passwordChanged(password))
            .catch((err)=> console.log(err));
    }

    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onPasswordChange(text){
        this.props.passwordChanged(text);
    }

    onRememberMeChange(checked){
        console.log('Check is: ', checked);
        this.props.rememberMeChanged(checked);
    }

    onLoginUser(){
        let { email, password, rememberMe } = this.props;
         AsyncStorage.getItem('deviceInfo')
                  .then((deviceId)=>{
                      this.props.loginUser({ email, password, rememberMe, deviceId });
                  })
                  .catch((err)=>{
                        console.log('ERR');
                  });
    }

    renderButton(){
        const { buttonStyle, buttonTextStyle, spinnerStyle } = styles;
        if(this.props.loading === false){
            return <Button 
                    onPress={this.onLoginUser.bind(this)} 
                    customButtonStyle={buttonStyle}
                    customTextStyle={buttonTextStyle}
                    >Login</Button>
        } else {
            return <Spinner customStyle={spinnerStyle}/>
        }
    }


    render(){
        
    const backgroundImage = require('../img/1.jpg');
    const { logoStyle, errorTextStyle, backgroundImageStyle, card, inputStyle, labelStyle, checkBoxContainerStyle, checkBoxLabelStyle,checkBoxStyle, inputContainerStyle, customCardSectionStyleIOS } = styles;

        return(
            <Image source={backgroundImage} style={backgroundImageStyle} >
            <Image source={require('../img/logo-transparent.png')} style={logoStyle}/>
            <CustomCard style={card}>
                <SplashScreen visible={this.state.showSplashScreen} /> 

                    <CustomCardSection>
                        <Input
                            label="Email"
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                            keyboard="email-address"
                            customInputStyle={inputStyle}
                            customLabelStyle={labelStyle}
                            customContainerStyle={inputContainerStyle}
                        />
                    </CustomCardSection>

                    <CustomCardSection>
                        <Input
                            label="Password"
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                            customInputStyle={inputStyle}
                            customLabelStyle={labelStyle}
                            customContainerStyle={inputContainerStyle}
                            secureTextEntry
                        />
                    </CustomCardSection>

                    <CustomCardSection >
                        <CheckBox
                            label='Remember Me'
                            labelStyle={checkBoxLabelStyle}
                            checkBoxStyle={checkBoxStyle}
                            containerStyle={checkBoxContainerStyle}
                            underlayColor='#000000'
                            onChange={(checked)=> this.onRememberMeChange(!checked) } // This is inverse for some reason
                        />
                    </CustomCardSection>

                    

                    <CustomCardSection>
                        {this.renderButton()}
                    </CustomCardSection>
                    <CustomCardSection customStyle={customCardSectionStyleIOS}>
                        <Text style={errorTextStyle}>{this.props.error}</Text>
                    </CustomCardSection>
            </CustomCard>
            </Image>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'red',
        flex: 1
    },
    backgroundImageStyle:{
        flex: 1,
        resizeMode: 'cover',
        width: undefined,
        height: undefined
    },
    logoStyle:{
        alignSelf: 'center',
        width: 310,
        marginTop: 20,
        marginBottom: 5
    },
    inputContainerStyle: {
        paddingTop: 5,
        paddingRight: 5,
        height: 50
    },
    inputStyle: {
        backgroundColor: '#242629',
        borderRadius: 4,
        color: '#fff'
    },
    checkBoxStyle: { 
        width: 155
    },
    checkBoxLabelStyle: {
        width: 155
    },
    checkBoxContainerStyle: {
        paddingLeft: 20,
        paddingTop: 10,
        width: 310
    },
    buttonTextStyle: {
        color: '#fff'
    },
    buttonStyle:{
        backgroundColor: '#1E90FF',
        marginTop: 15
    },
    labelStyle: {
        color: '#505050'
    },
    spinnerStyle: {
        marginTop: 15
    },
    customCardSectionStyleIOS: {
        flex: 1,
        justifyContent: Platform.OS === 'ios' ? 'center': null,
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        paddingLeft: 15
    }
}

const mapStateToProps = ({ auth }) => {
    let { email, password, rememberMe, error, loading } = auth;
    return {
        email,
        password,
        rememberMe, 
        error,
        loading
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, rememberMeChanged,loginUser })(LoginForm);