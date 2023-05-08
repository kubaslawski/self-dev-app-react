import APIConnect from "../APIConnect";
import { AxiosResponse } from "axios";
import { ILoginUserData } from "../../global/interfaces/ILoginUserData";
// API Connect
const request = new APIConnect();

export const loginUser = (userData: ILoginUserData): Promise<AxiosResponse<any>> => {
	return request.postUrlRequest("/auth/login/", userData);
};

export const getUserData = (): Promise<AxiosResponse<any>> => {
	return request.getUrlRequest("/auth/user/");
}
