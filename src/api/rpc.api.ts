import axios from "axios";
import { message } from "antd";

export interface ApiResponse<T> {
	status: "0" | "1";
	data: T;
}

const instance = axios.create({
	// baseURL: "/api",
	// baseURL: "https://v2.db3.network",
});

instance.interceptors.response.use(
	(response) => {
		const { result, error, id } = response.data;
		if (error) {
			message.error(`code：${error}`);
			return Promise.reject(error);
		}
		return { result, id };
	},
	(error) => {
		console.error(error);
		const errorMsg = error?.response?.data?.msg || error.toString();
		message.error(errorMsg);
		return Promise.reject(error);
	},
);

let rpcNode = "https://v2.db3.network";
export const setRpcNode = function (rpc: string) {
	rpcNode = rpc;
};

export default (method: string, params: any) => {
	return instance.post(rpcNode, { jsonrpc: "2.0", id: 2, method, params });
};
