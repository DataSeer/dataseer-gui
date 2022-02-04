/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

const getAccounts = (params) => {
	console.log(params);
	return axiosInstance.get('/accounts', { params: params })
		.then(res => res.data.res)
}

const getAccount = (id) => {
	return axiosInstance.get(`/accounts/${id}`)
		.then(res => res.data.res)
}

export default {
	getAccount,
	getAccounts,
};