import React from 'react';
import { View, Image, Text } from 'react-native';


const CallStatus = (props) => {
    return(
        <View>
            <View style={iconContainer}>
                <Image source={icon} style={iconStyle} />
            </View>
            <Text style={statusStyle}>{ callStatus }</Text>
        </View>
    );
};

const styles = {

};

export default CallStatus;