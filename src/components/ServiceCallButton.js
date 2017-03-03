import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { editServiceCall } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';

class ServiceCallButton extends Component {

    editServiceCall({ MessageID, Timestamp, RequestTime, RequestDate, CustomerName, CallbackNumber, ForService, ModelNumber, CallStatus, Notes }){
        this.props.editServiceCall({ MessageID, Timestamp, RequestTime, RequestDate, CustomerName, CallbackNumber, ForService, ModelNumber, CallStatus, Notes });
    }

  render(){

    const { MessageID, Timestamp, CustomerName, ForService, RequestDate, ModelNumber, CallStatus, RequestTime, CallbackNumber, Notes } = this.props;
    const { buttonStyle, textStyle, statusStyle, customerStyle, productStyle, modelStyle, modelStatusContainer, iconContainer, dateStyle, timeStyle, customerTimeContainer, iconStyle } = styles;

    let icon = CallStatus === "Hold" ? require('../img/yellow-dot.png') : require('../img/green-dot.png');
 
  return (
        <TouchableOpacity 
            onPress={() => this.editServiceCall({ MessageID, Timestamp, RequestTime, RequestDate, CustomerName, CallbackNumber, ForService, ModelNumber, CallStatus, Notes })}
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
    fontWeight: '800',
    paddingLeft: 15,
    paddingBottom: 1,
    paddingTop: 5
  },
  timeStyle:{
      position: 'absolute',
      top: 7,
      left: 278,
      right: 7
  },
  productStyle: {
    paddingLeft: 15
  },
  modelStatusContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  modelStyle: {
      paddingLeft: 15
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
    fontWeight: '500',
    position: 'absolute',
    left: 297
  },
  dateStyle: {
    fontWeight: '800',
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
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

const mapStateToProps = ({ call }) => {
    let { name, phone, ForService, modelNumber, status, notes } = call;
    return({
        name,
        phone,
        status,
        notes
    });
};

export default connect(mapStateToProps, { editServiceCall })(ServiceCallButton);