import axios from "axios";

import { AppDispatch } from "..";
import { saveAuthor, setAuthors } from "./actions";
import { addAuthor, fetchAuthors } from "../services";

interface AuthorData {
    name: string
}

export const fetchAuthorsThunk = () => async (dispatch: AppDispatch) => {
    try {
        const authors = await fetchAuthors();
        dispatch(setAuthors(authors));
    } catch(error) {
        console.error("Error fetching authors: ", error);
        throw error;
    }
}

export const addAuthorThunk = (token: string, authorData: AuthorData) => async (dispatch: AppDispatch) => {
    try {
        const response = await addAuthor(token, authorData);
        dispatch(saveAuthor(response.data.result));

        return response.data.result;
    } catch (error) {
        console.error("Error adding author: ", error);
        throw error;
    }
}