/**
 * Internal Dependencies
 */
import axiosInstance, { httpErrorHandler } from '@/services/http.js';

const getRoles = () => {
	return axiosInstance.get('/roles')
		.then(res => httpErrorHandler(res))
}

const getRole = (id) => {
	return axiosInstance.get(`/roles/${id}`)
		.then(res => res.data.res)
}

const addRole = (params) => {
	return axiosInstance.post(`/roles/`, params )
		.then((res) => httpErrorHandler(res));
};

const deleteRole = (id) => {
	return axiosInstance.delete(`/roles/${id}` )
		.then((res) => httpErrorHandler(res));
};

const updateRole = (id, params) => {
	return axiosInstance.put(`/roles/${id}`, params)
		.then(res => httpErrorHandler(res))
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
	getRole,
	getRoles,
	addRole,
	deleteRole,
	updateRole,
	getRolesList
};
