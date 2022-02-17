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

const deleteDocument = (id) => {
	return axiosInstance.delete(`/documents/${id}`)
		.then((res) => httpErrorHandler(res));
};

const addDocument = (params) => {
	const formData = new FormData;
	formData.append('file', params.file);
	formData.append('owner', params.owner);
	formData.append('organizations', params.organizations);
	formData.append('attachedFiles', params.attachedFiles);
	formData.append('dataseerML', params.dataseerML);
	
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

const getDocumentLogs = (id) => {
	return axiosInstance.get(`/documents/${id}/logs`).then((res) => httpErrorHandler(res));
};

const getDocumentPdf = (id) => {
	return axiosInstance.get(`/documents/${id}/pdf`)
		.then((res) => res.data);
};

const getDocumentPdfUrl = (id, docToken) => {
	return axiosInstance.get(`/documents/${id}/pdf/content?token=${docToken}` ,{
		responseType: 'blob'
	})
		.then((res) => {
			return URL.createObjectURL(res.data)
		});
};

const getDocumentTei = (id) => {
	return axiosInstance.get(`/documents/${id}/tei`)
		.then((res) => res.data);
};
const getDocumentTeiContent = (id) => {
	return axiosInstance.get(`/documents/${id}/tei/content`)
	.then((res) => res.data);
};

const getDocumentReport = (id) => {
	return axiosInstance.get(`/documents/${id}/reports/html/default`).then((res) => httpErrorHandler(res));
};

const getJsonDataTypes = () => {
	return axiosInstance.get(`/dataseer-ml/jsonDataTypes`)
		.then((res) => res.data);
};





export default {
	getDocuments,
	getDocument,
	addDocument,
	deleteDocument,
	getDocumentPdf,
	getDocumentPdfUrl,
	getDocumentTei,
	getDocumentTeiContent,
	getDocumentLogs,
	getDocumentReport,
	getJsonDataTypes
};
