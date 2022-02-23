/**
 * Internal Dependencies
 */
import axiosInstance, { httpErrorHandler } from '@/services/http.js';

const getAccounts = (params) => {
	return axiosInstance.get('/accounts', {params: params})
		.then(res => httpErrorHandler(res))
}

const getAccountsList = () => {
	return axiosInstance.get('/accounts')
		.then((res) => (
			res.data.res.map((account) => ({
				value: account._id,
				label: account.username
			}))
		)
	);
};

const getAccount = (id) => {
	return axiosInstance.get(`/accounts/${id}`)
		.then(res => httpErrorHandler(res))
}

const getAccountLogs = (id) => {
	return axiosInstance.get(`/accounts/${id}/logs`)
		.then(res => httpErrorHandler(res))
}

const addAccount = (params) => {
	return axiosInstance.post(`/accounts/`, params)
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
	getAccountsList,
	getAccounts,
	addAccount,
	deleteAccount,
	updateAccount,
	getAccountLogs
};