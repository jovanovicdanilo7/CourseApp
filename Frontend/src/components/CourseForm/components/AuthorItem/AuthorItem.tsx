import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from "react";

import "./AuthorItem.css";

interface AuthorItemProps {
    authorName: string;
    onAdd?: () => void;
    onDelete?: () => void;
}

export function AuthorItem(props: AuthorItemProps): JSX.Element {
    return (
        <div className="author-item">
            <p>{ props.authorName }</p>
            { props.onAdd && (
                <button onClick={ props.onAdd } type="button">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            ) }
            
            { props.onDelete && (
                <button onClick={ props.onDelete } type="button">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            ) }

        </div>
    );
}