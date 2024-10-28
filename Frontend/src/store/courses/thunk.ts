import axios from "axios";

import { AppDispatch } from "..";
import { deleteCourseById, saveCourse, setCourses, updateCourseAction } from "./actions";
import { addCourse, deleteCourse, fetchCourses, updateCourse } from "../services";

interface CourseData {
    title: string;
    description: string;
    duration: number;
    authors: string[];
}

export const fetchCoursesThunk = () => async (dispatch: AppDispatch) => {
    try {
        const courses = await fetchCourses();
        dispatch(setCourses(courses));
    } catch (error) {
        console.error("Error fetching courses: ", error);
        throw error;
    }
}

export const deleteCourseThunk = (token: string, courseId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await deleteCourse(token, courseId);
        dispatch(deleteCourseById(courseId));
    } catch (error) {
        console.error("Error deleteing course: ", error);
        throw error;
    }
}

export const addCourseThunk = (token: string, courseData: CourseData) => async (dispatch: AppDispatch) => {
    try {
        const response = await addCourse(token, courseData);
        dispatch(saveCourse(response.data.result));

        return response;
    } catch (error) {
        console.error("Error adding course: ", error);
        throw error;
    }
}

export const updateCourseThunk = (token: string, courseId: string, courseData: CourseData) => async (dispatch: AppDispatch) => {
    try {
        const response = await updateCourse(token, courseId, courseData);
        dispatch(updateCourseAction(response.data.result));
    } catch (error) {
        console.error("Error updating course: ", error);
        throw error;
    }
}