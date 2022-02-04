/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

const getRoles = () => {
	return axiosInstance.get('/organizations')
		.then(res => res.data.res)
}

export default {
	getRoles,
};