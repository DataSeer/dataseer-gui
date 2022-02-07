/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

const getAccounts = (params) => {
	return axiosInstance.get('/accounts', {params: params})
		.then(res => res.data.res)
}

const getAccount = (id) => {
	return axiosInstance.get(`/accounts/${id}`)
		.then(res => res.data.res)
}

const updateAccount = (id, params) => {
	return axiosInstance.put(`/accounts/${id}`, params)
		.then(res => {
			if (res.status !== 200)  {
				throw new Error(res.statusText)
			}
			
			if (res.data.err) {
				throw new Error(res.data.res)
			}
		})
}

const deleteAccount = (id) => {
	return axiosInstance.delete(`/accounts/${id}`)
		.then(res => {
			if (res.status !== 200)  {
				throw new Error(res.statusText)
			}
			
			if (res.data.err) {
				throw new Error(res.data.res)
			}
		})
}

export default {
	getAccount,
	getAccounts,
	deleteAccount,
	updateAccount
};