import React from 'react';
import {Route, Routes} from "react-router-dom";
// routes
import {paths} from "./paths";

const Routing: React.FC = () => {

	return (
			<Routes>
				{Object.entries(paths).map(([key, value]) => {
					return (
						<Route key={key} path={value.path} element={<value.element/>}/>
					)
				})}
			</Routes>
	);
};

export default Routing;
