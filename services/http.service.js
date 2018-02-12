import { AsyncStorage } from 'react-native';

class HttpService {
	constructor() {
		this.ip = 'http://54.241.143.173';
		// this.ip = 'http://192.168.1.118:5000';
	}

	handleResponse(response) {
		// Reject on error:
		if (response.status >= 300) return response.json()
			.then(data => Promise.reject(data.message))
			.catch(error => {
				if (typeof error === 'string') return Promise.reject(error);
				else return Promise.reject(response);
			});
		// Resolve on success:
		else return response.json()
			.then(data => Promise.resolve(data))
			.catch(error => Promise.resolve(response));
	}

	/////////////////////////////////////////////////
	//                HTTP METHODS
	/////////////////////////////////////////////////
	delete(url) {
		return AsyncStorage.getItem('magnetToken')
			.then(magnetToken => {
				return fetch(`${this.ip}${url}`, {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${magnetToken}`
					}
				});
			}).then(response => this.handleResponse(response))
			.catch(error => Promise.reject(error));
	}

	get(url) {
		return AsyncStorage.getItem('magnetToken')
			.then(magnetToken => {
				return fetch(`${this.ip}${url}`, {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${magnetToken}`
					}
				});
			}).then(response => this.handleResponse(response))
			.catch(error => Promise.reject(error));
	}

	post(url, body) {
		return AsyncStorage.getItem('magnetToken')
			.then(magnetToken => {
				return fetch(`${this.ip}${url}`, {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${magnetToken}`,
						'Content-Type': 'application/json'
					},
					body: body
				});
			}).then(response => this.handleResponse(response))
			.catch(error => Promise.reject(error));
	}

	put(url, body) {
		return AsyncStorage.getItem('magnetToken')
			.then(magnetToken => {
				return fetch(`${this.ip}${url}`, {
					method: 'PUT',
					headers: {
						'Authorization': `Bearer ${magnetToken}`,
						'Content-Type': 'application/json'
					},
					body: body
				});
			}).then(response => this.handleResponse(response))
			.catch(error => Promise.reject(error));
	}
}

export default new HttpService();