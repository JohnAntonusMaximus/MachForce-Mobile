import React, { Component } from 'react';
import { View } from 'react-native';
import ServiceCallButton from './ServiceCallButton';
import { Actions } from 'react-native-router-flux';

class ReloadModal extends Component {

    reload(){
        setTimeout(function() {
            Actions.main();
        }, 1000);
    }


    render(){
        return(
           <View>
            {this.reload()}
           </View>    
        );
    }
}



export default ReloadModal;