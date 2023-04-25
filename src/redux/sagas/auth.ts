import { call, put, takeEvery } from 'redux-saga/effects'
import {AxiosResponse} from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from "../types";
import {loginUser} from "../../api/requests/auth";
// interfaces
import {ILoginUserData} from "../../global/interfaces/ILoginUserData";
import {IAction} from "../../global/interfaces/IAction";
// global
import {SELF_DEV_APP_ACCESS_TOKEN, SELF_DEV_APP_REFRESH_TOKEN} from "../../global/variables";

function* loginUserSaga(action: IAction): any{
  try {
    // @ts-ignore
    const res = yield call(loginUser as (userData: ILoginUserData) => Promise<AxiosResponse<any>>, action.payload);
    yield put({type: LOGIN_SUCCESS, payload: res.data})
    saveToken(res.data)
  } catch(error: any){
    yield put({type: LOGIN_FAILURE, payload: error.response.data})
  }
}

interface IToken {
  access: string;
  refresh: string;
}

function saveToken(token: IToken){
  sessionStorage.setItem(SELF_DEV_APP_ACCESS_TOKEN, token.access);
  sessionStorage.setItem(SELF_DEV_APP_REFRESH_TOKEN, token.refresh);
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUserSaga)
}

export default watchLoginUser;
