/**
 * Internal Dependencies
 */
import axiosInstance, { httpErrorHandler } from '@/services/http.js';

const getAccounts = (params) => {
	return axiosInstance.get('/accounts', {params: params})
		.then(res => httpErrorHandler(res))
}

const getAccount = (id) => {
	return axiosInstance.get(`/accounts/${id}`)
		.then(res => httpErrorHandler(res))
}

const updateAccount = (id, params) => {
	return axiosInstance.put(`/accounts/${id}`, params)
		.then(res => httpErrorHandler(res))
}

const deleteAccount = (id) => {
	return axiosInstance.delete(`/accounts/${id}`)
		.then(res => httpErrorHandler(res))
}

export default {
	getAccount,
	getAccounts,
	deleteAccount,
	updateAccount
};