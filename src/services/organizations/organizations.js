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

const addOrganization = ( params) => {
	return axiosInstance.post(`/organizations/`, params )
		.then((res) => httpErrorHandler(res));
};

const deleteOrganization = (id) => {
	return axiosInstance.delete(`/organizations/${id}`)
		.then((res) => httpErrorHandler(res));
};

const getOrganizationsList = () => {
	return axiosInstance.get('/organizations')
		.then((res) => {	
			const data = res.data.res.map((organization) => ({
				value: organization._id,
				label: organization.name
			})).sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))

			return [...data];
		}
	);
};

export default {
	getOrganization,
	getOrganizations,
	deleteOrganization,
	updateOrganization,
	addOrganization,
	getOrganizationsList
};