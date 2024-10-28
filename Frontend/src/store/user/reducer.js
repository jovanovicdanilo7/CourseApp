import { GET_USER, LOGIN_SUCCESS, REMOVE_USER } from "./types";

const initalState = {
    isAuth: false,
    name: '',
    email: '',
    token: localStorage.getItem('token') || '',
    role: ''
};

export const userReducer = (state = initalState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token
            };

        case REMOVE_USER:
            return {
                ...state,
                isAuth: false,
                name: '',
                email: '',
                token: '',
                role: ''
            };

        case GET_USER:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                role: action.payload.role,
                id: action.payload.id
            };
        default:
            return state;
    }
}
