import React from "react";

import "./Button.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
    onClick?: () => void;
    buttonText: string;
    type: "button" | "submit";
    icon?: IconDefinition;
}

export function Button({ onClick, buttonText, type = "button", icon }: ButtonProps): JSX.Element {
    return (
        <button className="buttons" onClick={onClick} type={type}>
            {icon && <FontAwesomeIcon icon={icon} className="icon" />}
            { !icon &&  <p>{buttonText}</p>}
        </button>
    );
}