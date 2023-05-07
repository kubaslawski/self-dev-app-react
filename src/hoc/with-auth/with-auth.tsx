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


const withAuth = (
	Component: JSX.Element
): JSX.Element => {
	let isAuthenticated: boolean = false;
	const token: string | null = sessionStorage.getItem(SELF_DEV_APP_ACCESS_TOKEN);
	if(token){
		const decodedToken: IDecodedToken = jwtDecode(token);
		isAuthenticated = token ? decodedToken.exp * 1000 >= Date.now() : false;
	}
	return isAuthenticated ? Component : <Navigate to="/auth/login" />;
};

const Router = () => {
	return (
		<BrowserRouter>
			<Navbar/>
			<Routes>
				{Object.entries(paths).map(([, value]) => {
					return (
						<Route
							path={value.path}
							element={value.isPrivate ? withAuth(<value.element/>) : <value.element/>}
						/>
					)
				})}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
