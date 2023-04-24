import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import userReducer from "./reducers/userReducer";
// action
import watchLoginUser from "./sagas/auth";
import uiReducer from "./reducers/uiReducer";
const rootReducer: any = {
	ui: uiReducer,
	user: userReducer,
}

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
	reducer: rootReducer,
	middleware: [sagaMiddleware]
});

sagaMiddleware.run(watchLoginUser);


export default store;
