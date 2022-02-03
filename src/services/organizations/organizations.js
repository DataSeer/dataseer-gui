/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';


const getOrganizations = () => {
	return axiosInstance.get('/organizations')
		.then(res => res.data.res)
}

export default {
	getOrganizations,
};