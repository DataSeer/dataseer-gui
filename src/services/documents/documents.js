/**
 * Internal Dependencies
 */
import axiosInstance, { httpErrorHandler } from '@/services/http.js';

const getDocument = (id, params) => {
	return axiosInstance
		.get(`/documents/${id}`, {
			params
		})
		.then((res) => httpErrorHandler(res));
};

const deleteDocument = (id) => {
	return axiosInstance.delete(`/documents/${id}`).then((res) => httpErrorHandler(res));
};

const addDocument = (params) => {
	const formData = new FormData();
	formData.append('file', params.file);
	formData.append('owner', params.owner);
	formData.append('organizations', params.organizations);
	formData.append('attachedFiles', params.attachedFiles);
	formData.append('dataseerML', params.dataseerML);

	return axiosInstance
		.post(`/documents`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		.then((res) => httpErrorHandler(res));
};

const updateDocument = (id, params) => {
	return axiosInstance
		.put(`/documents/${id}`, params)
		.then((res) => httpErrorHandler(res));
};

const updateDocumentMetadata = (id, params) => {
	return axiosInstance
		.post(`/documents/${id}/metadata/reload`, params)
		.then((res) => httpErrorHandler(res));
};

const getDocuments = (params) => {
	return axiosInstance.get(`/documents`, { params }).then((res) => {
		httpErrorHandler(res);

		return {
			count: res.data.count,
			data: res.data.res
		};
	});
};

const getDocumentLogs = (id) => {
	return axiosInstance.get(`/documents/${id}/logs`).then((res) => httpErrorHandler(res));
};

const getDocumentPdf = (id, params) => {
	return axiosInstance
		.get(`/documents/${id}/pdf`, {
			params
		})
		.then((res) => res.data);
};

const getDocumentPdfUrl = (id, docToken) => {
	return axiosInstance
		.get(`/documents/${id}/pdf/content?token=${docToken}`, {
			responseType: 'blob'
		})
		.then((res) => {
			return URL.createObjectURL(res.data);
		});
};

const getDocumentTei = (id, params) => {
	return axiosInstance
		.get(`/documents/${id}/tei`, {
			params
		})
		.then((res) => res.data);
};

const getDocumentTeiContent = (id, params) => {
	return axiosInstance
		.get(`/documents/${id}/tei/content`, {
			params
		})
		.then((res) => res.data);
};

const getDocumentReport = (id) => {
	return axiosInstance
		.get(`/documents/${id}/reports/json/default`)
		.then((res) => res.data);
};

const getJsonDataTypes = (params) => {
	return axiosInstance
		.get(`/dataseer-ml/jsonDataTypes`, {
			params
		})
		.then((res) => res.data);
};

export default {
	getDocuments,
	getDocument,
	addDocument,
	updateDocument,
	updateDocumentMetadata,
	deleteDocument,
	getDocumentPdf,
	getDocumentPdfUrl,
	getDocumentTei,
	getDocumentTeiContent,
	getDocumentLogs,
	getDocumentReport,
	getJsonDataTypes
};
