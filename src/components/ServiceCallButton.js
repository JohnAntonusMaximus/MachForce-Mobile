import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { editServiceCall } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';

class ServiceCallButton extends Component {

    editServiceCall({ MessageID, Timestamp, RequestTime, RequestDate, CustomerName, CallbackNumber, ForService, ModelNumber, CallStatus, Notes, Location }){
        this.props.editServiceCall({ MessageID, Timestamp, RequestTime, RequestDate, CustomerName, CallbackNumber, ForService, ModelNumber, CallStatus, Notes, Location });
    }

  render(){

    const { MessageID, Timestamp, CustomerName, ForService, RequestDate, ModelNumber, CallStatus, RequestTime, CallbackNumber, Notes, Location } = this.props;
    const { buttonStyle, textStyle, statusStyle, customerStyle, productStyle, modelStyle, modelStatusContainer, iconContainer, dateStyle, timeStyle, customerTimeContainer, iconStyle } = styles;

    let icon = CallStatus === "Hold" ? require('../img/yellow-dot.png') : require('../img/green-dot.png');
 
  return (
        <TouchableOpacity 
            onPress={() => this.editServiceCall({ MessageID, Timestamp, RequestTime, RequestDate, CustomerName, CallbackNumber, ForService, ModelNumber, CallStatus, Notes, Location })}
            style={buttonStyle} 
        >
        <View style={customerTimeContainer}>
        <Text style={customerStyle}>{CustomerName}</Text>
        <Text style={timeStyle}>{RequestTime}</Text>
        </View>
            <Text style={productStyle}>
                {ForService}
            </Text>
        <View style={modelStatusContainer}>
            <Text style={modelStyle}>{ModelNumber}</Text> 
                <View style={iconContainer}>
                    <Image source={icon} style={iconStyle} />
                </View>
            <Text style={statusStyle}>{ CallStatus }</Text>
        </View>
        <Text style={dateStyle}>
            {RequestDate}
        </Text>
        </TouchableOpacity>
    );
  }
}

const styles = {
  customerTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  customerStyle: {
    fontWeight: Platform.OS === 'ios' ? '900' : '800',
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    paddingLeft: 15,
    paddingBottom: 1,
    paddingTop: 5
  },
  timeStyle:{
      position: 'absolute',
      fontWeight: Platform.OS === 'ios' ? '400' : null,
      fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
      top: 7,
      left: 278,
      right: 7
  },
  productStyle: {
    paddingLeft: 15,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto'
  },
  modelStatusContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  modelStyle: {
      paddingLeft: 15,
      fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto'
  },
  iconContainer: {
    position: 'absolute',
    left: 275
  },
  iconStyle: {
    height: 20,
    width: 20
  },
  statusStyle: {
    color: '#007aff',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Arial-BoldMT' : 'Roboto',
    fontWeight: Platform.OS === 'ios' ? '800' : '500',
    position: 'absolute',
    left: 297
  },
  dateStyle: {
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Arial-BoldMT' : 'Roboto',
    paddingLeft: 15,
    paddingBottom: 4,
    paddingTop: 1
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    overflow: Platform.OS === 'ios' ? 'hidden' : null,
    borderColor: '#007aff',
    marginLeft: Platform.OS === 'ios' ? 6 : 5,
    marginRight: Platform.OS === 'ios' ? 6 : 5,
    marginTop: 10
  }
};

const mapStateToProps = ({ call }) => {
    let { name, phone, ForService, modelNumber, status, notes, location } = call;
    return({
        name,
        phone,
        status,
        notes,
        location
    });
};

export default connect(mapStateToProps, { editServiceCall })(ServiceCallButton);