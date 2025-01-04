import { useNavigate } from "react-router-dom";
import React from "react";
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { Button } from "../../../../common/Button/Button";

import "./CourseCard.css"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { deleteCourseThunk } from "../../../../store/courses/thunk";

interface CourseCardProp {
    id: string;
    title: string;
    duration: string;
    creationDate: string;
    description: string;
    authors: string[];
}

export function CourseCard(props: CourseCardProp): JSX.Element {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async (courseId: string) => {
        try {
            await dispatch(deleteCourseThunk(user.token, courseId));
        } catch (error) {
            console.trace("onDelete: Error occurred");
            throw error;
        }
    }

    const onEdit = (courseId: string) => {
        navigate(`/courses/update/${courseId}`);
    }

    return (
        <div className="course-card-container">
            <h2>{props.title}</h2>

            <div className="course-text">
                <div className="course-info">
                    <p className="course-info-description">{props.description}</p>
                </div>

                <div className="course-metadata">
                    <div className="course-metadata-description">
                        <p><b>Authors:</b>{props.authors.join(', ')}</p>
                        <p><b>Duration:</b>{props.duration} hours</p>
                        <p><b>Created:</b>{props.creationDate}</p>
                    </div>

                    <div className="course-metadata-buttons">
                        <div className="course-metadata-buttons-show">
                            <Button onClick={ () => navigate(`/courses/${props.id}`) } buttonText="Show course" type="button"/>
                        </div>
                        { user.role === 'admin' && (
                            <>
                                <div className="course-metadata-buttons-delete">
                                    <Button onClick={() => { onDelete(props.id) }} buttonText="Delete" type="button" icon={faTrash} />
                                </div>

                                <div className="course-metadata-buttons-edit">
                                    <Button onClick={() => { onEdit(props.id) }} buttonText="Edit" type="button" icon={faEdit} />
                                </div>
                            </>
                        ) }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
