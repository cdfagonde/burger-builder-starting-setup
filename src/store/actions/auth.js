import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email,password) => {
    return dispatch => {
        dispatch(authStart());

        // Preparamos os dados para a chamada
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        // Agora sim, vamos executar a autenticação via axios.
        // Neste caso usamos o default axios xq isto só será usado uma vez.. não precisamos criar nada específico.
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTxYLDTuQNxAbBC6JuENkdXHOK2WcGxX8', authData)
            .then( response => {
                console.log(response);
                dispatch( authSuccess( response.data ));
            })
            .catch( err => {
                console.log(err);
                dispatch( authFail( err ));
            });
    };
};
