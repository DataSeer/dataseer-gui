/**
 * Internal Dependencies
 */
import axiosInstance, { httpErrorHandler } from '@/services/http.js';

const getDocument = (id, params) => {
	return axiosInstance.get(`/documents/${id}`, {
		params
	})
	.then((res) => httpErrorHandler(res));
};

const addDocument = (params) => {
	const formData = new FormData;
	formData.append('file', params.file);
	formData.append('owner', params.owner);
	formData.append('organizations', params.organizations);
	formData.append('attachedFiles', params.attachedFiles);
	
	return axiosInstance.post(`/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
	})
	.then((res) => httpErrorHandler(res));
};

const getDocuments = (params) => {
	return axiosInstance.get(`/documents`, {
		params
	})
	.then((res) => httpErrorHandler(res));
};

const getDocumentsLogs = (id) => {
	return axiosInstance.get(`/documents/${id}/logs`).then((res) => httpErrorHandler(res));
};

const getDocumentsPdf = (id) => {
	return axiosInstance.get(`/documents/${id}/pdf`).then((res) => httpErrorHandler(res));
};

export default {
	getDocument,
	addDocument,
	getDocuments,
	getDocumentsPdf,
	getDocumentsLogs
};
