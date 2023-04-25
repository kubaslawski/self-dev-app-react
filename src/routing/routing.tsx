import React from 'react';
import {Route, Routes} from "react-router-dom";
// routes
import {paths} from "./paths";
// hoc
import WithAuth from "../hoc/with-auth/with-auth";

const Routing: React.FC = () => {

	return (
			<Routes>
				{Object.entries(paths).map(([key, value]) => {
					const WrappedComponent = WithAuth(value.element);
					return (
						// <Route key={key} path={value.path} element={<value.element/>}/>
						<Route
							key={key}
							path={value.path}
							element={<WrappedComponent/>}
						/>
					)
				})}
			</Routes>
	);
};

export default Routing;
