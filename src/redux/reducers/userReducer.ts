import {IAction} from "../../global/interfaces/IAction";
import {
	LOGIN_SUCCESS
} from "../types";

interface IUserState {
	isAuthenticated: boolean;
}

const initialState: IUserState = {
	isAuthenticated: false,
}

const userReducer = (state: IUserState, action: IAction) => {
	switch (action.type){
		// case LOGIN_REQUEST:
		// 	return {
		// 		...state,
		// 		isAuthenticated:
		// 	}
		case LOGIN_SUCCESS:
			return {
				...initialState,
				isAuthenticated: true,
			}
		default: return initialState;
	}
}

export default userReducer;
