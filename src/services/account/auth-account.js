import axiosInstance from '@/services/http';

function login(username, password) {
	return axiosInstance
		.post('/signin', { username, password })
		.then((res) => res)
		.catch((error) => {
			return {error};
		});
}


function logout() {
	return axiosInstance.get('/signout')
}

function getCurrentUser() {
	return axiosInstance.get('/currentUser').then((res) => res)
}

export default {
	login,
	logout,
	getCurrentUser
};
