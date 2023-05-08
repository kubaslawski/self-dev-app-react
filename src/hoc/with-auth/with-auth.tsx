import React from "react";
// jwt
import jwtDecode from "jwt-decode";
// router
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
// routes
import {paths} from "../../routing/paths";
import Navbar from "../../components/Navbar/Navbar";
import {SELF_DEV_APP_ACCESS_TOKEN} from "../../global/variables";
import {IDecodedToken} from "../../global/interfaces/jwt";
import {useDispatch, useSelector} from "react-redux";
import {SET_IS_AUTHENTICATED} from "../../redux/types";


const WithAuth = (
	Component: JSX.Element
): JSX.Element => {
	const dispatch = useDispatch();
	const isAuthenticated: boolean = useSelector((state: any) => state.user.isAuthenticated);
	const token: string | null = sessionStorage.getItem(SELF_DEV_APP_ACCESS_TOKEN);
	if(token){
		const decodedToken: IDecodedToken = jwtDecode(token);
		dispatch({
			type: SET_IS_AUTHENTICATED,
			payload: token ? decodedToken.exp * 1000 >= Date.now() : false,
		})
	}
	return isAuthenticated ? Component : <Navigate to="/auth/login" />;
};

const Router = () => {
	// const isAuthenticated: boolean = useSelector((state: any) => state.user.isAuthenticated);

	return (
		<BrowserRouter>
			<Navbar/>
			<Routes>
				{Object.entries(paths).map(([, value]) => {
					return (
						<Route
							path={value.path}
							element={value.isPrivate ? WithAuth(<value.element/>) : <value.element/>}
						/>
					)
				})}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
