/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

const getChart = (params) => (
	axiosInstance.get('/charts/asap', {
		params,
		responseType: 'arraybuffer'
	}).then((response) => {
		let blob = new Blob([response.data], { type: response.headers['content-type'] });
		let image = URL.createObjectURL(blob);
		return image;
	})
);

export default {
	getChart
};
