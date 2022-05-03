/**
 * Internal Dependencies
 */
import axiosInstance, { httpErrorHandler } from '@/services/http.js';

// Upload a file (attached to a existing document).
const addFile = (id, params) => {
	return axiosInstance.put(`/files/${id}`, params)
		.then((res) => httpErrorHandler(res));
};

// Returns the content of the given document file.
const getFiles = (id) => {
	return axiosInstance.get(`/files/${id}`).then((res) => httpErrorHandler(res));
};

// Update "metadata" of the document.
const updateFiles = (id, params) => {
	return axiosInstance.put(`/files/${id}`, params)
		.then((res) => httpErrorHandler(res));
};

export {
	addFile,
	getFiles,
	updateFiles
}