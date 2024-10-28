import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import axios from 'axios';

import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";

import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { loginSuccess } from "../../store/user/actions";
import { loginUserReq } from "../../store/services";

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const response = await loginUserReq(data);
            let userData = response.user;
            userData.token = response.result;

            localStorage.setItem('token', userData.token);

            dispatch(loginSuccess(userData));

            navigate("/courses");

        } catch (error) {
            setLoginError("Invalid email or password");
        }
    };

    return (
        <div className="login-container">
            <h3>Login</h3>

            <form className="login-form" onSubmit={ handleSubmit(onSubmit) }>
                <Input 
                    labelText="Email"
                    placeholderText="Input text"
                    id="email"
                    type="text"
                    error={errors.email?.message as string | undefined}
                    { ...register("email", {
                        required: "Email is requred",
                        pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Invalid email format" }
                    }) }
                />
                <Input 
                    labelText="Password"
                    placeholderText="Input text"
                    id="password"
                    type="password"
                    error={errors.password?.message as string | undefined}
                    { ...register("password", {
                        required: "Password is requred"
                    }) }
                />
                { loginError &&  <p className="login-error">{loginError}</p>}

                <div className="login-form-button">
                    <Button buttonText="Login" type="submit"/>
                </div>

                <p className="login-form-text">If you have not an account, you may <Link to="/registration">Register</Link></p>
            </form>
        </div>
    );
}