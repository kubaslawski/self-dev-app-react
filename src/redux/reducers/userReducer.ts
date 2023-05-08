import { IAction } from "../../global/interfaces/IAction";
import {
		SET_USER_DATA,
	SET_IS_AUTHENTICATED,
} from "../types";

interface IUserState {
	isAuthenticated: boolean;
}

const initialState: IUserState = {
	isAuthenticated: false,
}

const userReducer = (state: IUserState, action: IAction) => {
	switch (action.type) {
		case SET_IS_AUTHENTICATED:
			return {
				...state,
				isAuthenticated: action.payload
			}
		case SET_USER_DATA:
			return {
				...initialState,
				...action.payload,
			}
		default: return initialState;
	}
}

export default userReducer;
