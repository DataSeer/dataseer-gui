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
	return axiosInstance.post('/signup', data)
		.then(res =>{
			if (res.status !== 200)  {
				throw new Error(res.statusText)
			}
			
			if (res.data.err) {
				throw new Error(res.data.res)
			}
		})
}

function resetPassword(data) {
	return axiosInstance.post('/resetPassword', data)
}

function forgetPassword(username) {
	return axiosInstance.post('/forgotPassword', {username})
}

export default {
	signin,
	signup,
	logout,
	getUserData,
	resetPassword,
	forgetPassword
};