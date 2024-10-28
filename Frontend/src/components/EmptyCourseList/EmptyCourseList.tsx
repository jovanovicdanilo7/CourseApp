import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../common/Button/Button";

import "./EmptyCourseList.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export function EmptyCourseList(): JSX.Element {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);

    const checkUsersRole = () => {
        if (user.role === "admin") {
            navigate("/courses/add");
        } else {
            alert("You don't have permissions to create a course. Please log in as ADMIN");
        }
    }

    return (
        <div className="empty-course">
            <h3>Your List Is Empty</h3>
            <div className="empty-course-text">
                <p>Please use "Add New Course" button to add your first course.</p>
            </div>
            
            <div className="empty-course-button">
                <Button onClick={ checkUsersRole } buttonText="Add New Course" type="button"/>
            </div>
        </div>
    );
}