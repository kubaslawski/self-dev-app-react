import axios from "axios";
const localPath = "http://127.0.0.1:8000"

interface IAPIConnect {
	path: string;
}

class APIConnect implements IAPIConnect {
	path: string;
	private static readonly TIMEOUT_MS = 5000;
	constructor() {
		this.path = localPath;
	};
	private getAxiosConfig = (config?: any) => {
		return { ...config, timeout: APIConnect.TIMEOUT_MS };
	}

	getUrlRequest = async (endpoint: string) => {
		return await axios.get(`${this.path}${endpoint}`, this.getAxiosConfig());
	};
	postUrlRequest = async (endpoint: string, data: unknown) => {
		return await axios.post(`${this.path}${endpoint}`, data, this.getAxiosConfig());
	}
	patchUrlRequest = async (endpoint: string, data: unknown) => {
		return await axios.patch(`${this.path}${endpoint}`, data, this.getAxiosConfig());
	};
	deleteUrlRequest = async (endpoint: string) => {
		return await axios.delete(`${this.path}${endpoint}`, this.getAxiosConfig());
	};
}

export default APIConnect;
