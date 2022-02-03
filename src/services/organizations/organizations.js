/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';


const getOrganizations = () => {
	const params = {
		sort: 'asc'
	};
	
	return axiosInstance.get('/organizations', {
		params
	})
		.then(res => res.data.res)
}

export default {
	getOrganizations,
};