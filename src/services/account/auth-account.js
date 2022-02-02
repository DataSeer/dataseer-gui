/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

function signin(username, password) {
	return axiosInstance.post('/signin', { username, password });
}

function logout() {
	axiosInstance.get('/signout');
}

function signup(data) {
	console.log(data);
	axiosInstance.post('/signup');
}

function getUserData() {
	return axiosInstance.get('/currentUser');
}

function resetPassword(username, currentPassword, newPassword, confirmNewPassword) {
	console.log(username, currentPassword, newPassword, confirmNewPassword);
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: username,
			current_password: currentPassword,
			new_password: newPassword,
			confirm_new_password: confirmNewPassword
		})
	};

	return fetch(
		'https://cloud.science-miner.com/dataseer-dev/api/resetPassword',
		requestOptions
	).then((res) => handleResponse(res));
}

function handleResponse(response) {
	if (!response.ok) {
		const error = new Error('Something went wrong...');
		return Promise.reject(error);
	}

	return response.json().then((data) => data);
}

export default {
	signin,
	signup,
	logout,
	getUserData,
	resetPassword
};
