import React from "react";
// jwt
import jwtDecode from "jwt-decode";
// router
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
// routes
import {paths} from "../../routing/paths";
import Navbar from "../../components/Navbar/Navbar";
import {SELF_DEV_APP_ACCESS_TOKEN} from "../../global/variables";

interface IComponentProps {

}


const withAuth = <P extends IComponentProps>(
	Component: React.ComponentType<P>
): JSX.Element => {
	let isAuthenticated = false;
	const token: string | null = sessionStorage.getItem(SELF_DEV_APP_ACCESS_TOKEN);
	if(token){
		const decodedToken: any = jwtDecode(token);
		isAuthenticated = token ? decodedToken.exp * 1000 >= Date.now() : false;
	}
	console.log(isAuthenticated)
	// @ts-ignore
	return isAuthenticated ? Component : <Navigate to="/auth/login" />;
};

const Router = () => {
	return (
		<BrowserRouter>
			<Navbar/>
			<Routes>
				{Object.entries(paths).map(([key, value]) => {
					return (
						<Route
							path={value.path}
							// @ts-ignore
							element={value.isPrivate ? withAuth(<value.element/>) : <value.element/>}
						/>
					)
				})}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
