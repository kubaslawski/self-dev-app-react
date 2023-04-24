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

function* loginUserSaga(action: IAction): any{

  try {
    // @ts-ignore
    const user = yield call(loginUser as (userData: ILoginUserData) => Promise<AxiosResponse<any>>, action.payload);
    yield put({type: LOGIN_SUCCESS, user})
  } catch(error: any){
    yield put({type: LOGIN_FAILURE, payload: error.response.data})
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUserSaga)
}

export default watchLoginUser;
