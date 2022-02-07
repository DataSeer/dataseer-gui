/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

const getRoles = () => {
	return axiosInstance.get('/roles')
		.then(res => res.data.res)
}

const getRole = (id) => {
	return axiosInstance.get(`/roles/${id}`)
		.then(res => res.data.res)
}

const updateRole = (id, params) => {
	return axiosInstance.put(`/roles/${id}`, {params: params})
		.then(res => {
			if (res.status !== 200)  {
				throw new Error(res.statusText)
			}
			
			if (res.data.err) {
				throw new Error(res.data.res)
			}
		})
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
	updateRole,
	getRolesList
};
