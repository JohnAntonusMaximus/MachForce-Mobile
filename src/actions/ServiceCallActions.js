import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';
import { 
    EDIT_SERVICE_CALL, 
    SERVICE_CALL_UPDATE, 
    CALL_FETCH, 
    CALL_FETCH_SUCCESS, 
    CALL_FETCH_FAIL, 
    SAVE_CHANGES, 
    SAVE_CHANGES_SUCCESS, 
    SAVE_CHANGES_FAIL,
    SHOW_COMM_MODAL,
    CLEAR_COMM_MODAL,
    CLEAR_ERROR,
    RERENDER
 } from './types';


const ROOT_URL =

axios.defaults.baseURL = 'http://api.machforce.io';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getServiceCalls = ({ token, name}) => {
    return (dispatch) => {
        dispatch({ type: CALL_FETCH, payload: true });

        const technicianName = encodeURIComponent(name);
        var config = { headers: {'Authorization': token } };
        const FETCH_URL = '/mobile/getServiceCalls/' + technicianName;

        axios.get(FETCH_URL, config)
            .then(serviceCalls => fetchSuccess(dispatch, serviceCalls))
            .catch( error => fetchFailure(dispatch, "Could not retrieve calls from API."));
    };
};

export const refreshServiceCalls = ({ token, name}) => {
    return (dispatch) => {
        dispatch({ type: RERENDER, payload: true });

        const technicianName = encodeURIComponent(name);
        var config = { headers: {'Authorization': token } };
        const FETCH_URL = '/mobile/getServiceCalls/' + technicianName;

        axios.get(FETCH_URL, config)
            .then(serviceCalls => fetchSuccess(dispatch, serviceCalls))
            .catch( error => fetchFailure(dispatch, "Could not retrieve calls from API."));
    };
};

export const editServiceCall = (action) => {
    console.log('EDIT_SERVICE_ACTION->',action);
    let { MessageID, Timestamp, RequestTime, RequestDate, CustomerName, CallbackNumber, ForService, ModelNumber, CallStatus, Notes, Location } = action;
    
    return (dispatch) => {
        dispatch({
            type: EDIT_SERVICE_CALL,
            payload:  { MessageID, Timestamp, RequestTime, RequestDate, CustomerName, CallbackNumber, ForService, ModelNumber, CallStatus, Notes, Location } 
        });
        Actions.updateServiceCall();
    };
} 

export const saveChanges = ( token, technicianName, MessageID, Timestamp, CallStatus, Notes, Location ) => {

    return (dispatch) => {
        dispatch({ type: SAVE_CHANGES, payload: true });

        const POST_URL = '/mobile/updateCall';

        const BODY = { technicianName, MessageID, Timestamp, CallStatus, Notes, Location };

        console.log(BODY);

        axios({
            method: 'post',
            url: POST_URL,
            headers: {'Authorization': token },
            data: BODY
        }) 
        .then(response => {
            setTimeout(function() {
                updateSuccess(dispatch, response);
            }, 1000);
            setTimeout(function() {
                Actions.reload({ type: ActionConst.RESET })
            }, 1000);
        })
        .catch(error =>  updateFail(dispatch, 'Error saving changes, check your connectivity.'));
    };
};

export const serviceCallUpdate = ({ prop, value }) =>{
    return({
        type: SERVICE_CALL_UPDATE,
        payload: { prop, value }
    });
};

export const showCommModal = () => {
    
    return({
        type: SHOW_COMM_MODAL,
        payload: { newCommState: true }
    })
};

export const clearError = () => {
    return({
        type: CLEAR_ERROR
    })
}

export const clearCommModal = () =>{
    return({
        type: CLEAR_COMM_MODAL
    });
};


/////////////////////////[HELPER METHODS]//////////////////////////

function fetchSuccess(dispatch, serviceCalls){
    dispatch({
        type: CALL_FETCH_SUCCESS,
        payload: serviceCalls.data.Items
    });
}

function fetchFailure(dispatch, error){
    dispatch({
        type: CALL_FETCH_FAIL,
        payload: error
    });
}

function updateSuccess(dispatch, response){
    dispatch({
        type: SAVE_CHANGES_SUCCESS,
        payload: response
    });
}

function updateFail(dispatch, error){
    dispatch({
        type: SAVE_CHANGES_FAIL,
        payload: error
    });
}



       

