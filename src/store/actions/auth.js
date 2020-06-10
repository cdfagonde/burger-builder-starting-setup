import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch( logout());
        }, expirationTime * 1000);   // setTimeout recebe milisegundos
    };
};

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());

        // Preparamos os dados para a chamada
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        const myKey = 'AIzaSyBTxYLDTuQNxAbBC6JuENkdXHOK2WcGxX8';

        // Identificamos o método, para saber se teremos SignIn ou SignUp.
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + myKey;
        if(!isSignup){
            // Método para singin
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + myKey;
        };

        // Agora sim, vamos executar a autenticação via axios.
        // Neste caso usamos o default axios xq isto só será usado uma vez.. não precisamos criar nada específico.
        axios.post(url, authData)
            .then( response => {
                // Sinalizamos sucesso na autenticação
                dispatch( authSuccess( response.data.idToken, response.data.localId ));
                // Vamos cuidar da expiração
                dispatch( checkAuthTimeout( response.data.expiresIn));
            })
            .catch( err => {
                // console.log(err.response);
                dispatch( authFail( err.response.data.error ));
            });
    };
};
