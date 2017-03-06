import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import OneSignal from 'react-native-onesignal';
import Router from './Router';

import reducers from './reducers';

let store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('registered', this.onRegistered);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('registered', this.onRegistered);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onRegistered(notifData) {
        console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
        console.log('Device info here: ', device);
        AsyncStorage.setItem('deviceInfo', device.userId)
            .then(()=>{
               console.log('Device Info Saved');
            })
            .catch((err)=>{
                console.log('ERR: ', err);
            });
    }
    
    
    render(){

        return(
            <Provider store={ store }>
                <Router />
            </Provider>
        );
    }
}

export default App;