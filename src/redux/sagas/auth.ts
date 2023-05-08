import { call, put, takeEvery } from 'redux-saga/effects'
import { AxiosResponse } from "axios";
import {
  FETCH_USER_DATA,
  SET_USER_DATA,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  REQUEST_ERROR
} from "../types";
import { getUserData, loginUser } from "../../api/requests/auth";
// interfaces
import { ILoginUserData } from "../../global/interfaces/ILoginUserData";
import { IAction } from "../../global/interfaces/IAction";
// global
import { SELF_DEV_APP_ACCESS_TOKEN, SELF_DEV_APP_REFRESH_TOKEN } from "../../global/variables";

function* loginUserSaga(action: IAction): any {
  const {navigate, userData} = action.payload
  try {
    const res = yield call(loginUser as (userData: ILoginUserData) => Promise<AxiosResponse<any>>, userData);
    saveToken(res.data)
    yield put(navigate("/"))
  } catch (error: any) {
    yield put({ type: LOGIN_FAILURE, payload: error.response.data })
  }
}

function* getUserDataSaga(): any {
  try {
    const res = yield call(getUserData);
    yield put({ type: SET_USER_DATA, payload: res.data });
  } catch (error: any) {
    yield put({ type: REQUEST_ERROR, payload: error.response.data })
  }
}

interface IToken {
  access: string;
  refresh: string;
}

function saveToken(token: IToken) {
  sessionStorage.setItem(SELF_DEV_APP_ACCESS_TOKEN, token.access);
  sessionStorage.setItem(SELF_DEV_APP_REFRESH_TOKEN, token.refresh);
}

function* watchAuth() {
  yield takeEvery(LOGIN_REQUEST, loginUserSaga);
  yield takeEvery(FETCH_USER_DATA, getUserDataSaga);
}

export default watchAuth;
