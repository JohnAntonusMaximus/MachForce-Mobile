import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, PHONE_CHANGED, NAME_CHANGED, LOGOUT_USER } from './types';

axios.defaults.baseURL = 'http://api.machforce.io';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const emailChanged = (text) => {
    return({
        type: EMAIL_CHANGED,
        payload: text
    });
};

export const passwordChanged = (text) => {
    return({
        type: PASSWORD_CHANGED,
        payload: text
    });
};

export const loginUser = ({ email, password}) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER, payload: true })
        
        const POST_URL = '/mobile/login';
        const BODY = { email, password };

        axios({
            method: 'post',
            url: POST_URL,
            data: BODY
        })
        .then((response) => {
            console.log(response);
            if(response.data.technicianName){
                console.log('RETRIEVED TECH NAME: ', response.data.technicianName);
                console.log('RETRIEVED TOKEN: ', response.data.token)
                // AsyncStorage.setItem('technicianName', response.data.technicianName)
                //     .then(AsyncStorage.setItem('token', response.data.token))
                //     .then(loginUserSuccess(dispatch, response.data));
                
                loginUserSuccess(dispatch, response.data);
                setTimeout(function() {
                    Actions.main();
                }, 500);
            } else {
                loginUserFail(dispatch, 'Login Failed. Please check your credentials.');
            }
        })
        .catch(() => loginUserFail(dispatch, 'Login Failed. Please check your credentials.'));
        };
};

export const logoutUser = () => {
    return({
        type: LOGOUT_USER
    });
    Actions.pop();
}

function loginUserSuccess(dispatch, user){
    dispatch({ 
        type: LOGIN_USER_SUCCESS,
        payload: user
    })
}

function loginUserFail(dispatch, error){
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error
    })
}