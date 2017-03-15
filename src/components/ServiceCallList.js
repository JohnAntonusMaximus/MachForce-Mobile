import React, { Component } from 'react';
import { AsyncStorage, BackAndroid, ScrollView, View, Text, Image, RefreshControl, Platform } from 'react-native';
import ServiceCallButton from './ServiceCallButton';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getServiceCalls, refreshServiceCalls, logoutUser } from '../actions';
import { Spinner } from './common';
import moment from 'moment';

class ServiceCallList extends Component {

    static onRight() {
        Actions.auth({ type: ActionConst.RESET });
    }

    static rightTitle =  'Log Out' ;


    formatPhoneNumber(callbackNumber){
        let chop = callbackNumber.slice(2);
        let output = chop.substr(0,3) + "-"+ chop.substr(3,3) + "-" + chop.substr(6);
        return output;
    }

    componentWillMount(){
        AsyncStorage.setItem('userLoggedIn', 'true')
            .then(()=>{
               console.log('userLoggedIn Flag Set!');
            })
            .catch((err)=>{
                console.log('ERR: ', err);
            });
        BackAndroid.addEventListener('hardwareBackPress', () => { return true });
    }


    componentDidMount(){
        let name    = this.props.user.technicianName;
        let token   = this.props.user.token;

        this.props.getServiceCalls({ token, name });
    }

    componentWillUnmount(){
        AsyncStorage.removeItem('userLoggedIn')
            .then(()=>{
               console.log('userLoggedIn Flag Removed!');
            })
            .catch((err)=>{
                console.log('ERR: ', err);
            });
    }

    onRefresh(){
        let name    = this.props.user.technicianName;
        let token   = this.props.user.token;

        this.props.refreshServiceCalls({ token, name });
    }

    logoutUser(){
        this.props.logoutUser();
    }

    renderServiceCalls(){
        
        const { spinnerStyle, noCallsStyle, noCallsContainer, checker, noCallsSubtextStyle } = styles;
        
        if(this.props.loading === true){
            return ( 
                    <Spinner customStyle={spinnerStyle} />
            );
        } else if(this.props.serviceCalls.length === 0){

            return(
                <View style={noCallsContainer}>
                    <Image source={require('../img/check.png')} style={checker} />
                    <Text style={noCallsStyle}>Great Job!</Text>
                    <Text style={noCallsSubtextStyle}>Service calls complete.</Text>
                </View>
            );
        
        } else {
            
            return this.props.serviceCalls.map(serviceCall => 
                    <ServiceCallButton
                        key={serviceCall.messageID.S}
                        MessageID ={serviceCall.messageID.S}
                        Timestamp={serviceCall.timestamp.S}
                        CustomerName={serviceCall.customerName.S}
                        Location={serviceCall.customerAccount.S}
                        ForService={serviceCall.productForService.S}
                        ModelNumber={serviceCall.modelNumber.S}
                        RequestDate={moment(serviceCall.timestamp.S).format('MMMM Do YYYY')}
                        RequestTime={moment(serviceCall.timestamp.S).format('h:mm A')}
                        CallStatus={serviceCall.status.S}
                        CallbackNumber={this.formatPhoneNumber(serviceCall.callbackNumber.S)}
                        Notes={serviceCall.notes.S}
                    />
                );
        }
    }

    render(){
        return(
            <ScrollView style={styles.ios.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        tintColor="#ffffff"
                        title="Loading..."
                        colors={['#ffffff', '#ffffff', '#ffffff']}
                        progressBackgroundColor="#1E90FF"
                    />
                }
            >
                {this.renderServiceCalls()}
            </ScrollView>
        );
    }
}

const styles = {
    checker: {
        marginTop: 140,
        height: 100,
        width: 100
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    noCallsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    noCallsStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 28,
        fontWeight: 'bold'
    },
    noCallsSubtextStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
    },
    ios: {
        container: {
            marginTop: Platform.OS === 'ios' ? 20 : null
        }
    }
}

const mapStateToProps = ({ calls, auth }) => {
    let { serviceCalls, error, loading, isRefreshing } = calls;
    let { user } = auth;
    return({
        serviceCalls,
        error,
        loading,
        isRefreshing,
        user
    });
};



export default connect(mapStateToProps, { getServiceCalls, refreshServiceCalls, logoutUser })(ServiceCallList);