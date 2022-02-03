/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

const getAccounts = () => {
	return axiosInstance.get('/accounts')
		.then(res => res.data.res)
}

export default {
	getAccounts,
};