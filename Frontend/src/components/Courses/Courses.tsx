import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../common/Button/Button";
import { getCouresDuration } from "../../helpers/getCourseDuration";
import { EmptyCourseList } from "../EmptyCourseList/EmptyCourseList";
import { CourseCard } from "./components/CourseCard/CourseCard";
import { SearchBar } from "../Courses/components/SearchBar/SearchBar";
import { AppDispatch, RootState } from "../../store/index";

import "./Courses.css";
import { fetchUsersThunk } from "../../store/user/thunk";


interface Course {
    id: string;
    title: string;
    description: string;
    duration: number;
    creationDate: string;
    authors: string[];
};

interface Author {
    name: string;
    id: string;
};

export function Courses({ loading }: { loading: boolean }): JSX.Element {
    const courses = useSelector((state: RootState) => state.courses);
    const authors = useSelector((state: RootState) => state.authors);
    const user = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsersThunk());
        setFilteredCourses(courses);
    }, [courses, dispatch]);

    const handleSearchResults = (results: Course[]) => {
        setFilteredCourses(results);
    };

    const getAuthorNamesByIds = (authorIds: string[]): string[] => {
        return authorIds.map(id => {
            const author = authors.find((author: Author) => author.id === id);
            return author ? author.name : 'Unknown Author';
        });
    };

    const checkUsersRole = () => {
        if (user.role === "admin") {
            navigate("/courses/add");
        } else {
            alert("You don't have permissions to create a course. Please log in as ADMIN");
        }
    }

    if (loading) {
        return <p>Loading courses...</p>;
    }

    if (!loading && courses.length === 0) {
        return <EmptyCourseList />;
    }

    return (
        <div className="courses">
            <div className="courses-container">
                <div className="option-bar">
                    <div className="search-bar">
                        <SearchBar onSearchResults={handleSearchResults} />
                    </div>
                    <div className="option-bar-button">
                        <Button onClick={ checkUsersRole } buttonText="Add new course" type="button" />
                    </div>
                </div>

                {filteredCourses.length === 0 ? (
                    <p className="no-courses">No courses found</p>
                ) : (
                    filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            title={course.title}
                            description={course.description}
                            duration={getCouresDuration(course.duration)}
                            creationDate={course.creationDate}
                            authors={getAuthorNamesByIds(course.authors)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
