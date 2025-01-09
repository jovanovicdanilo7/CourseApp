import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from "react";

import { Button } from '../../common/Button/Button';
import { formatCreationDate } from '../../helpers/formatCreationDate';
import { getCouresDuration } from '../../helpers/getCourseDuration';
import { RootState } from '../../store';

import "./CourseInfo.css";

interface Author {
    name: string;
    id: string;
};

interface CourseFormData {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
}

export function CourseInfo(): JSX.Element {
    const { courseId } = useParams();
    const authors = useSelector((state: RootState) => state.authors);
    const courses = useSelector((state: RootState) => state.courses);
    const navigate = useNavigate();

    const course = courses.find((course: CourseFormData) => course.id === courseId);

    if (!course) {
        return (
            <div>
                <p>Course not found.</p>
                <Button onClick={() => navigate("/courses")} buttonText="Back" type="button" />
            </div>
        );
    }

    const getAuthorNamesByIds = (authorIds: string[]): string[] => {
        return authorIds.map(id => {
            const author = authors.find((author: Author) => author.id === id);
            return author ? author.name : 'Unknown Author';
        });
    };

    const authorNames = getAuthorNamesByIds(course.authors);

    return (
        <div className="course-info-container">
            <h2>{course.title}</h2>

            <div className="course-info-box">
                <div className="course-info-description">
                    <h3>Description:</h3>
                    <p>{course.description}</p>
                </div>

                <div className="course-info-metadata">
                    <p><b>ID:</b>{course.id}</p>
                    <p><b>Duration:</b><span>{getCouresDuration(course.duration)}</span> hours</p>
                    <p><b>Created:</b>{formatCreationDate(course.creationDate)}</p>
                    <p><b>Authors:</b>{authorNames.join(', ')}</p>
                </div>
            </div>

            <Button onClick={ () => navigate("/courses") } buttonText="Back" type="button" className="course-info-back-btn"/>
        </div>
    );
}

