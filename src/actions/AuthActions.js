import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, PHONE_CHANGED, NAME_CHANGED, LOGOUT_USER } from './types';

axios.defaults.baseURL = 'https://api.machforce.io';
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

export const loginUser = ({ email, password, deviceId }) => {

          return (dispatch) => {
                dispatch({ type: LOGIN_USER, payload: true })
                
                const POST_URL = '/mobile/login';

                const emailStrip    = email.replace(/\s/g, "");   
                const passwordStrip = password.replace(/\s/g,  "");


                const BODY = { email: emailStrip, password: passwordStrip, deviceId };

                
                axios({
                    method: 'post',
                    url: POST_URL,
                    timeout: 10000,
                    data: BODY
                })
                .then((response) => {
                    if(response.data.technicianName){
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
                .catch((error) => {
                    if(error.response){
                        loginUserFail(dispatch, error.response.data);
                    } else {
                        loginUserFail(dispatch, 'Nothing was sent. Please check your connectivity.');
                    }
                });
            
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