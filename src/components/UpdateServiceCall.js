import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, Text, TouchableOpacity, Platform } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import ModalPicker from 'react-native-modal-picker';
import { serviceCallUpdate, saveChanges, clearError, showCommModal, clearCommModal } from '../actions';
import {
    CardSection,
    Input,
    Button,
    Spinner
} from './common';
import CustomerInfo from './CustomerInfo';
import CustomerPhone from './CustomerPhone';
import CommunicationsModal from './CommunicationsModal'
import ScrollCard from './ScrollCard';
import ErrorModal from './ErrorModal';



class UpdateServiceCall extends Component {


    toggleCommModal({ ShowCommModal }){
        this.props.showCommModal({ShowCommModal});
    }

    onCommModalCancel(){
        this.props.clearCommModal();
    }

    onModalCancel(){
        this.setState({ showCommModal: !this.state.showCommModal })
    }

    onOkPress(){
        this.props.clearError();
    }

    onSave(){
        console.log(this.props.Notes);
        const token             = this.props.user.token;
        const technicianName    = this.props.user.technicianName;

        const { MessageID, Timestamp, CallStatus, Notes, Location} = this.props;

        this.props.saveChanges(token, technicianName, MessageID, Timestamp, CallStatus, Notes, Location );
    }

    renderSaveButton(buttonStyle){
        if(this.props.Loading === false){
            return <Button 
                    onPress={ this.onSave.bind(this) }
                    customButtonStyle={buttonStyle}
                    >Save</Button>
        } else {
            return <Spinner />
        }
    }

    renderPicker(CallStatus, picker, serviceCallUpdate){
        if(Platform.OS === 'ios'){
            return(
                <ModalPicker
                    style={{ flex: 2, borderColor: '#1E90FF' }}
                    selectTextStyle={{ fontWeight: 'bold' }}
                    initValue={CallStatus}
                    data={ [{ key: 'Open', label: 'Open' },{ key: 'Hold', label: 'On Hold' },{ key: 'Closed', label: 'Closed' }] }
                    onChange={ value => serviceCallUpdate({ prop: 'CallStatus', value: value.key }) }
                />
            );
        } else {
            return(
                <Picker 
                            selectedValue={CallStatus}
                            onValueChange={ value => serviceCallUpdate({ prop: 'CallStatus', value })}
                            style={picker}  
                >
                            <Picker.Item label="Open" value="Open" />
                            <Picker.Item label="On Hold" value="Hold" />
                            <Picker.Item label="Closed" value="Closed" />
                </Picker>
            );
        }
    }

    render(){
        // Styles
        const { noteInputStyle, noteContainerStyle, picker, pickerTextStyle, customContainerStyle, button } = styles;
        // Props
        const { ShowCommModal, CallbackNumber, ShowErrorModal, Error, MessageID, Timestamp, CustomerName, ForService, ModelNumber, CallStatus, serviceCallUpdate, Notes, RequestDate, RequestTime, Location} = this.props;
        
        return(
            <ScrollCard>
            <CommunicationsModal visible={ShowCommModal} phone={CallbackNumber} onCancel={this.onCommModalCancel.bind(this)} />
            <ErrorModal visible={ShowErrorModal} errorMessage={Error} onOkPress={this.onOkPress.bind(this)}/>
                <CardSection>
                    <CustomerInfo 
                        label="Customer"
                        value={CustomerName}
                    />
                </CardSection>

                <CardSection>
                    <CustomerInfo  
                        label="Location"
                        value={Location}
                    />
                </CardSection>

                <CardSection>
                    <CustomerPhone 
                        label="Phone"
                        value={CallbackNumber}
                        onPress={ShowCommModal => this.toggleCommModal({ ShowCommModal })}
                    />
                </CardSection>

                <CardSection>
                    <CustomerInfo  
                        label="Product"
                        value={ForService}
                    />
                </CardSection>

                <CardSection>
                    <CustomerInfo 
                        label="Model"
                        value={ModelNumber}
                    />
                </CardSection>

                <CardSection>
                    <Text style={pickerTextStyle}>Status</Text>
                    {this.renderPicker(CallStatus, picker, serviceCallUpdate)}
                </CardSection>

                <CardSection customContainerStyle={noteContainerStyle}>
                    <Input 
                        label="Notes"
                        placeholder="Please provide any additional information about this service call..."
                        onChangeText={value => serviceCallUpdate({ prop: 'Notes', value }) }
                        value={Notes}
                        customContainerStyle={customContainerStyle}
                        customInputStyle={noteInputStyle}
                        multiline={true}
                        numberOfLines = {4}
                    />
                </CardSection>

                <CardSection>
                    {this.renderSaveButton(button)}
                </CardSection>

                <CardSection>
                    <Button customButtonStyle={button} onPress={() => Actions.main({ type: ActionConst.POP_AND_REPLACE }) }>Cancel</Button>
                </CardSection>
            </ScrollCard>
        );
    }
}

const styles = {
    picker: {
        flex: 2
    },
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        paddingTop: 10
    },
    customContainerStyle: {
        height: 150
    },
    noteInputStyle: {
        height: 150,
        paddingTop: Platform.OS === 'ios' ? 50 : 35
    },
    button: {
        overflow: Platform.OS === 'ios' ? 'hidden' : null
    }
};


const mapStateToProps = ({ call, auth }) => {
    let { CustomerName, CallbackNumber, ForService, ModelNumber, CallStatus, Notes, Loading, Error, ShowCommModal, ShowErrorModal, MessageID, Timestamp, RequestTime, RequestDate, Location } = call;
    let { user } = auth;
    return({
        MessageID,
        Timestamp,
        RequestDate,
        RequestTime,
        CustomerName, 
        CallbackNumber, 
        ForService, 
        ModelNumber, 
        CallStatus, 
        Notes,
        Location, 
        Loading, 
        Error, 
        ShowCommModal, 
        ShowErrorModal,
        user
    });
};

export default connect(mapStateToProps, { serviceCallUpdate, saveChanges, clearError, showCommModal, clearCommModal })(UpdateServiceCall);