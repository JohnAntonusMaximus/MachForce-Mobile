import { CALL_FETCH, CALL_FETCH_FAIL, CALL_FETCH_SUCCESS, RERENDER } from '../actions/types';

const INITIAL_STATE = { serviceCalls: [], error: '', loading: false, isRefreshing: false };

export default (state = INITIAL_STATE, action) => {
   
    switch(action.type){
        case CALL_FETCH:
            return {...state, loading: action.payload };
        case CALL_FETCH_SUCCESS:
            return {...state, serviceCalls: action.payload, loading: false,  isRefreshing: false };
        case CALL_FETCH_FAIL:
            return {...state, error: action.payload, loading: false, isRefreshing: false };
        case RERENDER:
            return {...state, INITIAL_STATE, isRefreshing: true };
        default:
            return state;
    }
};