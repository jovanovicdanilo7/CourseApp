import { DELETE_COURSE, SAVE_COURSE, SET_COURSES, UPDATE_COURSE } from "./types";

const initalState = [];

export const coursesReducer = (state = initalState, action) => {
    switch(action.type) {
        case SET_COURSES:
            return action.payload;
        case SAVE_COURSE:
            return [...state, action.payload]
        case DELETE_COURSE:
            return state.filter(course => course.id !== action.payload);
        case UPDATE_COURSE:
            return state.map(course => course.id === action.payload.id ? action.payload : course);
        default:
            return state;
    }
};
