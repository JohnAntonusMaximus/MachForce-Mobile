import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';
import { Client } from 'bugsnag-react-native';
import Router from './Router';


import reducers from './reducers';

let store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {

    constructor(opts){
        super(opts);
        this.client = new Client('49193e1cc8700a48a5aee4e053930147'); // BUGSNAG: Uncomment this line before deploying into production
    }

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('registered', this.onRegistered);
        OneSignal.addEventListener('ids', this.onIds);

        // ERASE THIS CODE AND PUT THE ASYNCBACK INTO onIds FUNCTION WHEN TESTING ON AN ACTUAL DEVICE //
        //const device = { userId: '7776-56tyguh7567-yyyuiuhdasdj' }; // Erase this when deploying
        // AsyncStorage.setItem('deviceInfo', device.userId)
        //     .then(()=>{
        //        console.log('Device Info Saved');
        //     })
        //     .catch((err)=>{
        //         console.log('ERR: ', err);
        //     });
         // ERASE THIS CODE AND PUT THE ASYNCBACK INTO onIds FUNCTION WHEN TESTING ON AN ACTUAL DEVICE //

    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('registered', this.onRegistered);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        // console.log("Notification received: ", notification);
        console.log('MESSAGE RECEIVED!! Set content-available flag to 1') // this is fired when a service call comes in and the user is already IN the app in foreground
    }

    onOpened(openResult) {
        // this is fired when the user actually clicks the notifcations from the notifcation center.
            //   console.log('Message: ', openResult.notification.payload.body);
            //   console.log('Data: ', openResult.notification.payload.additionalData);
            //   console.log('isActive: ', openResult.notification.isAppInFocus);
            //   console.log('openResult: ', openResult);
        AsyncStorage.getItem('userLoggedIn')
            .then((result)=> {
                if(result === 'true'){
                    Actions.pushReload({ type: ActionConst.RESET });
                }
            })
            .catch((err)=> console.log('NO USER SET! BAM!'));
            // We want to call this only if either user is set OR currentScene is not auth. We can't access redux state above the Provider wrapper, 
             // this is fired when the user actually clicks the notifcations from the notifcation center.
        
    }

    onRegistered(notifData) {
        console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
        
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