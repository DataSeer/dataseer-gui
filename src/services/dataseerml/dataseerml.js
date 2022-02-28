/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

const getJsonDataTypes = () => (
	axiosInstance.get('/dataseer-ml/jsonDataTypes')
		.then(res => res.data)
)

const postProcessDataseerSentence = (params) => (
	axiosInstance.post('/dataseer-ml/processDataseerSentence', params)
		.then(res => res.data)
)

export default {
	getJsonDataTypes,
	postProcessDataseerSentence
}