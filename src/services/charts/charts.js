/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

const getChartImg = (params) => (
	axiosInstance.get('/charts/asap', {
		params: {
			render: 'png',
			...params
		},
		responseType: 'arraybuffer'
	}).then((response) => {
		let blob = new Blob([response.data], { type: response.headers['content-type'] });
		let image = URL.createObjectURL(blob);
		return image;
	})
);

const getChartUrl = (params) => {
	const qs = new URLSearchParams(params).toString()
	return `${process.env.VUE_APP_BASE_API_URL}/charts/asap?${qs}`
};

export default {
	getChartImg,
	getChartUrl
};
