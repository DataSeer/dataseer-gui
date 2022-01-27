import axiosInstance from '@/services/http';

function login(username, password) {
	return axiosInstance
		.post('/signin', { username, password })
		.then(res => {
			if (res.status === 200 && !res.data.err) {
				return res
			}
			
			if (res.data.err) {
				throw new Error(res.data.res);
			}
		})
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
