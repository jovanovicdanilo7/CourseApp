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
        console.trace("fetchAuthorsThunk: Error occurred");
        throw error;
    }
}

export const addAuthorThunk = (token: string, authorData: AuthorData) => async (dispatch: AppDispatch) => {
    try {
        const response = await addAuthor(token, authorData);
        dispatch(saveAuthor(response.data.result));

        return response.data.result;
    } catch (error) {
        console.trace("addAuthorThunk: Error occurred");
        throw error;
    }
}