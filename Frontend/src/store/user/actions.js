import { GET_USER, LOGIN_SUCCESS, REMOVE_USER } from "./types"

export const loginSuccess = userData => {
    return {
        type: LOGIN_SUCCESS,
        payload: userData
    };
};

export const logout = () => {
    return {
        type: REMOVE_USER
    }
}

export const getUser = (userData) => {
    return {
        type: GET_USER,
        payload: userData
    }
}