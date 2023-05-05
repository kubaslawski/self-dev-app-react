import React from 'react';
import "./global/styles/global-styles.css"
// redux
import {Provider} from "react-redux";
import store from "./redux/store";
// router
import Router from "./hoc/with-auth/with-auth";

function App() {
	return (
		<Provider store={store}>
			<Router/>
		</Provider>

	);
}

// export default App;
export default App;
