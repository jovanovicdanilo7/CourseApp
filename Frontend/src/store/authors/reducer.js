import { DELETE_AUTHOR, SAVE_AUTHOR, SET_AUTHORS } from "./types";

const initalState = [];

export const authorsReducer = (state = initalState, action) => {
    switch(action.type) {
        case SET_AUTHORS:
            return action.payload;
        case SAVE_AUTHOR:
            return [...state, action.payload];
        case DELETE_AUTHOR:
            return state.filter(author => author.id !== action.payload);
        default:
            return state;
    }
}