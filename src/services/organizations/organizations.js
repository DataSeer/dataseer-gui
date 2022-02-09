/**
 * Internal Dependencies
 */
import axiosInstance, { httpErrorHandler } from '@/services/http.js';

const getOrganizations = () => {
	return axiosInstance.get('/organizations').then((res) => httpErrorHandler(res));
};

const getOrganization = (id) => {
	return axiosInstance.get(`/organizations/${id}`)
		.then((res) => httpErrorHandler(res));
};

const updateOrganization = (id, params) => {
	return axiosInstance.put(`/organizations/${id}`, params )
		.then((res) => httpErrorHandler(res));
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
	getOrganization,
	getOrganizations,
	updateOrganization,
	getOrganizationsList
};