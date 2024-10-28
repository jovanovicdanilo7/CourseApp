import { AppDispatch } from "..";
import { fetchUser } from "../services";
import { getUser } from "./actions";

export const fetchUsersThunk = () => async (dispatch: AppDispatch) => {
    try {
        const token = localStorage.getItem('token');
        const user = await fetchUser(token);

        dispatch(getUser(user.result));
    } catch (error) {
        console.error("Error occurred while fetching user in thunk: ", error);
    }
};
