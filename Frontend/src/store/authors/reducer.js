import { SAVE_AUTHOR, SET_AUTHORS } from "./types";

const initalState = [];

export const authorsReducer = (state = initalState, action) => {
    switch(action.type) {
        case SET_AUTHORS:
            return action.payload;
        case SAVE_AUTHOR:
            return [...state, action.payload];
        default:
            return state;
    }
}