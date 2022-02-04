/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

const getOrganizations = () => {
	return axiosInstance.get('/organizations').then((res) => res.data.res);
};

const getOrganizationsList = () => {
	return axiosInstance.get('/organizations')
		.then((res) => {	
			const data = res.data.res.map((organization) => ({
				value: organization._id,
				label: organization.name
			}))

			return [...data];
		}
	);
};

export default {
	getOrganizations,
	getOrganizationsList
};