import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersThunk } from './store/user/thunk';

import { Login } from './components/Login/Login';
import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { Registration } from './components/Registration/Registration';
import { CreateCourse } from './components/CourseForm/CourseForm';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { fetchAuthorsThunk } from './store/authors/thunk';
import { fetchCoursesThunk } from './store/courses/thunk';
import { AppDispatch, RootState } from './store';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import "./App.css";

function App() {
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fetchCoursesAndAuthors = async () => {
            try {
                    await dispatch(fetchCoursesThunk());
                    await dispatch(fetchAuthorsThunk());
                    await dispatch(fetchUsersThunk());
                    setLoading(false);
            } catch(error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchCoursesAndAuthors();
    }, [dispatch]);

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
