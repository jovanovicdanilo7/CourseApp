import { DELETE_AUTHOR, SAVE_AUTHOR, SET_AUTHORS } from "./types";

export const setAuthors = (authors) => {
    return {
        type: SET_AUTHORS,
        payload: authors
    };
};

export const saveAuthor = (author) => {
    return {
        type: SAVE_AUTHOR,
        payload: author
    };
};

export const deleteAuthorById = (authorId) => {
    return {
        type: DELETE_AUTHOR,
        payload: authorId
    };
};