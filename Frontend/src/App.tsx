import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersThunk } from './store/user/thunk';
import axios from 'axios';

import { Login } from './components/Login/Login';
import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { Registration } from './components/Registration/Registration';
import { CreateCourse } from './components/CourseForm/CourseForm';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { fetchAuthorsThunk } from './store/authors/thunk';
import { fetchCoursesThunk } from './store/courses/thunk';
import { AppDispatch, RootState } from './store';
import { logout } from './store/user/actions';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import "./App.css";

function App() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();
    const alertTriggered = useRef<boolean>(false);

    useEffect(() => {

        const fetchCoursesAndAuthors = async () => {
            try {
                    await Promise.all([
                        dispatch(fetchCoursesThunk()),
                        dispatch(fetchAuthorsThunk()),
                        dispatch(fetchUsersThunk())
                    ]);
                    setLoading(false);
            } catch(error) {
                console.trace("fetchCoursesAndAuthors: Error occurred");
                setLoading(false);

                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401 && !alertTriggered.current) {
                        alertTriggered.current = true;
                        alert("Your session has expired. Please log in again.");
                        dispatch(logout());
                        localStorage.removeItem('token');
                        navigate("/login");
                    }
                }

                throw error;
            }
        };

        fetchCoursesAndAuthors();
    }, [dispatch]);

    return (
        <div className='app-container'>
            <Header />

            <Routes>
                {user.token ? (
                    <>
                        <Route path="*" element={<Navigate to="/courses" />} />
                        <Route path='/courses' element={<Courses loading={loading} />} />
                        <Route path='/courses/:courseId' element={<CourseInfo />} />
                        <Route 
                            path='/courses/add' 
                            element={
                                <PrivateRoute>
                                    <CreateCourse />
                                </PrivateRoute>
                            }
                        />
                        <Route 
                            path='/courses/update/:courseId' 
                            element={
                                <PrivateRoute>
                                    <CreateCourse />
                                </PrivateRoute>
                            }
                        />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path='/registration' element={<Registration />} />
                        <Route path='/login' element={<Login />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
