import axios from "./axios";
export const block = {
	search: (params: any) => {
		return axios.get("/block_search", { params });
	},
};
