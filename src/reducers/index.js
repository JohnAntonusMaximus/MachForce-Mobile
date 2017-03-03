import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CallStatusReducer from './CallStatusReducer';
import ServiceCallsReducer from './ServiceCallsReducer';

const reducers = combineReducers({
    auth: AuthReducer,
    calls: ServiceCallsReducer,
    call: CallStatusReducer
});

export default reducers;