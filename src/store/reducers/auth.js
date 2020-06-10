import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    user: null,
    error: null,
    loading: false
};

const authStart = (state) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const authSuccess = (state,action) => {
    return {
        ...state,
        token: action.idToken,
        user: action.userId,
        error: null,
        loading: false
    };
};

const authFail = (state,action) => {
    return {
        ...state,
        token: null,
        user: null,
        error: action.error,
        loading: false
    };
};

const authLogout = () => {
    return {
        token: null,
        user: null,
        error: null,
        loading: false
    };
};


const reducer = (state = initialState,action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:     return authStart(state);
        case actionTypes.AUTH_SUCCESS:   return authSuccess(state,action);
        case actionTypes.AUTH_FAIL:      return authFail(state,action);
        case actionTypes.AUTH_LOGOUT:    return authLogout();
        default:  return state;
    }
};

export default reducer;