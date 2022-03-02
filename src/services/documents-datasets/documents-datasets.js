/**
 * Internal Dependencies
 */
import axiosInstance, { httpErrorHandler } from '@/services/http.js';

const addDataset = (id, params) => {
	return axiosInstance.post(`/documents/${id}`, {
		params
	})
	.then((res) => httpErrorHandler(res));
};

export default {
	addDataset
};