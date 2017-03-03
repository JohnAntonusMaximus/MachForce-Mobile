import { 
    EDIT_SERVICE_CALL, 
    SERVICE_CALL_UPDATE, 
    SAVE_CHANGES, 
    SAVE_CHANGES_SUCCESS, 
    SAVE_CHANGES_FAIL, 
    SHOW_COMM_MODAL, 
    CLEAR_ERROR,
    CLEAR_COMM_MODAL
} from '../actions/types';

const INITIAL_STATE = { 
    key: '',
    Timestamp: '',
    RequestTime: '',
    RequestDate: '',
    CallbackNumber: '', 
    CustomerName: '', 
    ForService: '', 
    ModelNumber: '', 
    CallStatus: 'Open', 
    Notes: '', 
    Loading: false, 
    Error: '',
    ShowCommModal: false,
    ShowErrorModal: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type){
        case EDIT_SERVICE_CALL:
            return ({...state,
                    MessageID: action.payload.MessageID,
                    Timestamp: action.payload.Timestamp,
                    RequestTime: action.payload.RequestTime,
                    RequestDate: action.payload.RequestDate,
                    CallbackNumber: action.payload.CallbackNumber, 
                    CustomerName: action.payload.CustomerName, 
                    ForService: action.payload.ForService,
                    ModelNumber: action.payload.ModelNumber,
                    CallStatus: action.payload.CallStatus, 
                    Notes: action.payload.Notes 
                });
        case SERVICE_CALL_UPDATE:
            return {...state, [action.payload.prop]: action.payload.value }
        case SAVE_CHANGES:
            return {...state, Loading: true, Error: '' };
        case SAVE_CHANGES_SUCCESS:
            return {...state, INITIAL_STATE, Loading: false, Error: 'false'  };
        case SAVE_CHANGES_FAIL:
            return {...state, Loading: false, Error: action.payload, ShowErrorModal: true };
        case SHOW_COMM_MODAL:
            return {...state, ShowCommModal: action.payload.newCommState };
        case CLEAR_COMM_MODAL:
            return {...state, ShowCommModal: false }
        case CLEAR_ERROR:
            return {...state, ShowErrorModal: false, Error: '' };
        default:
            return state;
    }
};