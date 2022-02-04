/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

const getRoles = () => {
	return axiosInstance.get('/roles')
		.then(res => res.data.res)
}

const getRolesList = () => {
	return axiosInstance.get('/roles')
		.then((res) => {	
			const data = res.data.res.map((organization) => ({
				value: organization._id,
				label: organization.label
			}))

			return [...data];
		}
	);
}

export default {
	getRoles,
	getRolesList
};