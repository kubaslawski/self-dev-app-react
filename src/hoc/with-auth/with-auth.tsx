import React from "react";
import {redirect} from 'react-router-dom';
import {SELF_DEV_APP_ACCESS_TOKEN} from "../../global/variables";
// store
import store from "../../redux/store";
// jwt
import jwtDecode from "jwt-decode";
// types
import {LOGOUT} from "../../redux/types";



interface IWithAuth {
	Component: React.ComponentType<any>
}

const withAuthentication = <P extends {}>(Component: React.ComponentType<P>): React.FC<P> => (props) => {
	const token = sessionStorage.getItem(SELF_DEV_APP_ACCESS_TOKEN);
	// TODO: AUTH LOGIC

	return <Component {...props} />;
};

export default withAuthentication;
