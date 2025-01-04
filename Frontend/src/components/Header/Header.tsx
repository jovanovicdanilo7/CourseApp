import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

import { Button } from "../../common/Button/Button";
import { Logo } from "./components/Logo/Logo";

import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/user/actions";
import { logoutUser } from "../../store/services";
import axios from "axios";


export function Header(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const hideButtonPaths = ["/registration", "/login"];
    const shouldHideButton = hideButtonPaths.includes(location.pathname);
    const token = localStorage.getItem('token');

    const onLogout = async () => {
        try {
            await logoutUser(user.token);

            dispatch(logout());
            localStorage.removeItem('token');
    
            setTimeout(() => {
                navigate("/login");
            }, 0);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    alert("Your session has expired. Please log in again.");
                    dispatch(logout());
                    localStorage.removeItem('token');
                    navigate("/login");
                } else {
                    alert("An unexpected error occurred. Please try again.");
                }
            } else {
                console.error("An unknown error occurred:", error);
            }
        }
    };
    

    return (
        <div className="header">
            <Logo />
            { !shouldHideButton && token && (
                <div className="header-second-half">
                    <p className="header-second-half-name">{ user.name }</p>
                    <Button onClick={ onLogout } buttonText="Logout" type="button" />
                </div>
            )}
            { !shouldHideButton && !token && (
                <Button onClick={ () => navigate("/login") } buttonText="Login" type="button" />
            ) }
        </div>
    );
}
