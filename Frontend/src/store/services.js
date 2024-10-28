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
        console.error("Error in fetchUser: ", error);
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
        console.error("Error in logoutUser: ", error);
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
        console.error("Error in deleteCourse: ", error);
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
        console.error("Error in addCourse: ", error);
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
        console.error("Error in addAuthor: ", error);
        throw error;
    }
}

export const fetchCourseById = async (courseId) => {
    try {
        const response = await axios.get(`http://localhost:4000/courses/${courseId}`);

        return response.data.result;
    } catch (error) {
        console.error("Error in fetchCourseById: ", error);
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
        console.error("Error in updateCourse: ", error);
        throw error;
    }
}