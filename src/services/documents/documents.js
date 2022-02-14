/**
 * Internal Dependencies
 */
import axiosInstance, { httpErrorHandler } from '@/services/http.js';

const getDocuments = (params) => {
	return axiosInstance.get(`/documents`, { params: params })
		.then(res => httpErrorHandler(res))
}

const getDocumentsLogs = (id) => {
	return axiosInstance.get(`/documents/${id}/logs`)
		.then(res => httpErrorHandler(res))
}

export default {
	getDocuments,
	getDocumentsLogs
}