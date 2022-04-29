/**
 * External Dependencies
 */
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_BASE_API_URL,
	withCredentials: true
});

export function httpErrorHandler(response) {
	const status = response.status;
	const error = response.data.err;
	
	if (status === 401) {
		throw new Error('HTTP ERROR: Access not granted.');
	} else if (status === 404) {
		throw new Error('HTTP ERROR: URL no found (route does not exist)');
	} else if (status === 503) {
		throw new Error('HTTP ERROR: Internal service error.');
	} else if (status !== 200) {
		throw new Error('Something went wrong.');
	}
	
	if (error) {
		throw new Error(response.data.res);
	}

	return response.data;
}

export default axiosInstance;
