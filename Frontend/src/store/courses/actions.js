import { DELETE_COURSE, SAVE_COURSE, SET_COURSES, UPDATE_COURSE } from "./types";

export const setCourses = courses => {
    return {
        type: SET_COURSES,
        payload: courses
    };
};

export const saveCourse = (course) => {
    return {
        type: SAVE_COURSE,
        payload: course
    };
};

export const deleteCourseById = (courseId) => {
    return {
        type: DELETE_COURSE,
        payload: courseId
    };
};

export const updateCourseAction = (course) => {
    return {
        type: UPDATE_COURSE,
        payload: course
    };
};