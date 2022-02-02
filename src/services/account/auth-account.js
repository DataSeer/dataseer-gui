/**
 * Internal Dependencies
 */
import axiosInstance from '@/services/http.js';

function signin(username, password) {
	return axiosInstance.post('/signin', { username, password });
}

function getUserData() {
	return axiosInstance.get('/currentUser');
}

function logout() {
	axiosInstance.get('/signout');
}

function signup(data) {
	console.log(data);
	axiosInstance.post('/signup');
}

function resetPassword(data) {
	return axiosInstance.post('/resetPassword', data)
}

export default {
	signin,
	signup,
	logout,
	getUserData,
	resetPassword
};
