import React from "react";

import "./Input.css";

interface InputInterface {
    labelText: string;
    placeholderText: string;
    id: string;
    type: string;
    value?: string;
    error?: string | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputInterface>(function Input(
    { labelText, placeholderText, id, type, value, error, onChange, className, ...rest }, ref) {

    const isDescriptionInput = className?.includes('description-input');

    return (
        <div className="input-container">
            <label htmlFor={id} className="input-label">{labelText}</label>
            {isDescriptionInput ? (
                <textarea
                    id={id}
                    className={`input-field ${className} ${error ? 'input-error' : ''}`}
                    placeholder={placeholderText}
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    value={value}
                    onChange={onChange}
                    {...rest}
                />
            ) : (
                <input
                    id={id}
                    className={`input-field ${className} ${error ? 'input-error' : ''}`}
                    placeholder={placeholderText}
                    type={type}
                    ref={ref as React.Ref<HTMLInputElement>}
                    value={value}
                    onChange={onChange}
                    {...rest}
                />
            )}
            {error && <span className="error-message">{error}</span>}
        </div>
    );
});
