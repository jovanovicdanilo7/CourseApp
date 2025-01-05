import axios from 'axios';

export const fetchCourses = async () => {
    const response = await axios.get('http://localhost:4000/courses/all');

    return response.data.result;
};

export const fetchAuthors = async () => {
    const response = await axios.get('http://localhost:4000/authors/all');

    return response.data.result;
};

export const loginUserReq = async (data) => {
    const response = await axios.post('http://localhost:4000/login', {
        name: data.name,
        email: data.email,
        password: data.password
    });

    return response.data;
}

export const registerUserReq = async (data) => {
    const response = await axios.post('http://localhost:4000/register', data);

    return response.data;
}

export const fetchUser = async (token) => {
    const httpGetUser = axios.create({
        baseURL: 'http://localhost:4000',
        headers: { 'Authorization': token }
    });
    
    try {
        const response = await httpGetUser.get('/users/me');

        return response.data;
    } catch (error) {
        console.trace("fetchUser: Error occured");
        throw error;
    }
};

export const logoutUser = async (token) => {
    const httpDelReq = axios.create({
        baseURL: 'http://localhost:4000',
        headers: { 'Authorization': token }
    });

    try {
        const response = await httpDelReq.delete('/logout');

        return response;
    } catch (error) {
        console.trace("logoutUser: Error occured");
        throw error;
    }
}

export const deleteCourse = async (token, courseId) => {
    const httpDelReq = axios.create({
        baseURL: 'http://localhost:4000',
        headers: { 'Authorization': token }
    });

    try {
        const response = await httpDelReq.delete(`/courses/${courseId}`);
        return response;
    } catch (error) {
        console.trace("deleteCourse: Error occured");
        throw error;
    }
}

export const addCourse = async (token, courseData) => {
    const httpPostReq = axios.create({
        baseURL: 'http://localhost:4000',
        headers: { 'Authorization': token }
    });

    try {
        const response = await httpPostReq.post('/courses/add', courseData);

        return response;
    } catch (error) {
        console.trace("addCourse: Error occured");
        throw error;
    }
}

export const addAuthor = async (token, authorData) => {
    const httpPostReq = axios.create({
        baseURL: 'http://localhost:4000',
        headers: { 'Authorization': token }
    });

    try {
        const response = await httpPostReq.post('/authors/add', authorData);

        return response;
    } catch (error) {
        console.trace("addAuthor: Error occured");
        throw error;
    }
}

export const deleteAuthor = async (token, authorId) => {
    const httpDelReq = axios.create({
        baseURL: 'http://localhost:4000',
        headers: { 'Authorization': token }
    });

    try {
        const response = await httpDelReq.delete(`/authors/${authorId}`);

        return response;
    } catch (error) {
        console.trace("deleteAuthor: Error occured");
        throw error;
    }
}

export const fetchCourseById = async (courseId) => {
    try {
        const response = await axios.get(`http://localhost:4000/courses/${courseId}`);

        return response.data.result;
    } catch (error) {
        console.trace("fetchCourseById: Error occured");
        throw error;
    }
}

export const updateCourse = async (token, courseId, courseData) => {
    const httpPostReq = axios.create({
        baseURL: 'http://localhost:4000',
        headers: { 'Authorization': token }
    });

    try {
        const response = await httpPostReq.put(`/courses/${courseId}`, courseData);

        return response;
    } catch (error) {
        console.trace("updateCourse: Error occured");
        throw error;
    }
}