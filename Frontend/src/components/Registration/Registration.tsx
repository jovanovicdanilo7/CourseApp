import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

import { Button } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";


import "./Registration.css";
import { registerUserReq } from "../../store/services";

export function Registration(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            await registerUserReq(data);

            navigate("/login");
        } catch(error) {
            console.trace("onSubmit: Error occurred");
            throw error;
        }
    };

    return (
        <div className="registration-container">
            <h3>Registration</h3>
            <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    labelText="Name"
                    placeholderText="Input text"
                    id="name"
                    type="text"
                    error={errors.name?.message as string | undefined}
                    {...register("name", {
                        required: "Name is required",
                    })}
                />
                <Input
                    labelText="Email"
                    placeholderText="Input text"
                    id="email"
                    type="text"
                    error={errors.email?.message as string | undefined}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid email format",
                        },
                    })}
                />
                <Input
                    labelText="Password"
                    placeholderText="Input text"
                    id="password"
                    type="password"
                    error={errors.password?.message as string | undefined}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long",
                        },
                    })}
                />

                <div className="registration-form-button">
                    <Button buttonText="Register" type="submit" />
                </div>

                <p className="registration-form-text">If you have an account, you may <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}