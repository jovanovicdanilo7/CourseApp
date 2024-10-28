import React from "react";

import logo from "../../../../logo.svg";

import "./Logo.css";

export function Logo(): JSX.Element {
    return (
        <div className="logo-container">
            <img className="header-logo" src={ logo } alt="Logo"/>
        </div>
    );
}