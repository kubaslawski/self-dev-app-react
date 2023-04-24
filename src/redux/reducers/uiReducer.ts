import {IAction} from "../../global/interfaces/IAction";
import {IErrors} from "../../global/interfaces/IErrors";
import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
} from "../types";

interface IUserState {
	errors: IErrors;
	isLoading: boolean;
}

const initialState: IUserState = {
	errors: {
		main: []
	},
	isLoading: false,
}

const uiReducer = (state: IUserState, action: IAction) => {
	switch (action.type){
		// case LOGIN_REQUEST:
		// 	return {
		// 		...state,
		// 		isAuthenticated:
		// 	}
		case LOGIN_FAILURE:
			return {
				...initialState,
				errors: action.payload,
				isLoading: false,
			}
		case LOGIN_REQUEST:
			return {
				...initialState,
				isLoading: true,
			}
		default: return initialState;
	}
}

export default uiReducer;
