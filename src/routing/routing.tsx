import React from 'react';
import {Router, Route, Routes, BrowserRouter} from "react-router-dom";
// pages
import Habits from "../pages/Habits";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/auth/login";
import SignUp from "../pages/SignUp";
import Tasks from "../pages/Tasks";

const Routing: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Home/>}/>
				<Route path={"/login"} element={<LoginPage/>}/>
				<Route path={"/signup"} element={<SignUp/>}/>
				<Route path={"/tasks"} element={<Tasks/>}/>
				<Route path={"/habits"} element={<Habits/>}/>
			</Routes>
		</BrowserRouter>

	);
};

export default Routing;
