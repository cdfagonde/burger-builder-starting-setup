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
    // Primeiramente, precisamos limpar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    // Agora vai..
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            console.log('Tempo esgorado!!');
            dispatch( logout());
        }, expirationTime * 1000 );   // setTimeout recebe milisegundos
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
                console.log(response.data);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                console.log(expirationDate);
                // Primeiramente vamos guardar token e timeout no localStorage
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId', response.data.localId);
                // Sinalizamos sucesso na autenticação
                dispatch( authSuccess( response.data.idToken, response.data.localId ));
                // Vamos cuidar da expiração
                dispatch( checkAuthTimeout( response.data.expiresIn ));
            })
            .catch( err => {
                // console.log(err.response);
                dispatch( authFail( err.response.data.error ));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            // Se não existir token, só precisamos limpar..
            dispatch( logout());
        } else {
            const userId = localStorage.getItem('userlId');
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date() ) {
                const newTimeout = (expirationDate.getTime() - new Date().getTime()) / 1000;
                // const newTimeout = expirationDate.getSeconds() - new Date().getSeconds();
                console.log(newTimeout);
                // Ultimo login ainda não expirou..
                dispatch( authSuccess( token, userId ));
                // Precisamos recalcular o timeout
                dispatch( checkAuthTimeout( newTimeout ));
            } else {
                // Ultimo acesso expirado..
                dispatch( logout());
            }
        }
    };
};
