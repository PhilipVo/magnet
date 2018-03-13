// const base64 = require('base-64');
import { AsyncStorage } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';

import http from './http.service';
import notification from './notification.service';

class SessionService {
	constructor() {
		this.isFacebookUser = false;
		this.id;
		this.distance = 40234;
	}

	facebookLogin(data) {
		return http.post('/users/facebook-login', JSON.stringify(data))
			.then(data => {
				return AsyncStorage.setItem('magnetToken', data.magnetToken)
					.then(() => AsyncStorage.getItem('magnetToken'))
					.then(magnetToken => {
						this.setSession(magnetToken);
						this.isFacebookUser = true;
						return Promise.resolve(data.isNew);
					}).catch(error => Promise.reject(error));
			}).catch(error => Promise.reject(error));
	}

	login(data) {
		return http.post('/users/login', JSON.stringify(data))
			.then(magnetToken => AsyncStorage.setItem('magnetToken', magnetToken))
			.then(() => AsyncStorage.getItem('magnetToken'))
			.then(magnetToken => this.setSession(magnetToken))
			.catch(error => Promise.reject(error));
	}

	logout() {
		return http.get('/api/users/logout')
			.then(() => AsyncStorage.removeItem('magnetToken'))
			.then(() => {
				if (this.isFacebookUser) LoginManager.logOut();
				this.isFacebookUser = false;
			}).catch(error => Promise.reject(error));
	}

	register(data) {
		return http.post('/users/register', JSON.stringify(data))
			.then(magnetToken => AsyncStorage.setItem('magnetToken', magnetToken))
			.then(() => AsyncStorage.getItem('magnetToken'))
			.then(magnetToken => this.setSession(magnetToken))
			.catch(error => Promise.reject(error));
	}

	setSession(magnetToken) {
		return new Promise((resolve, reject) => {
			try {
				// Set user:
				// payload = JSON.parse(base64.decode(magnetToken.split('.')[1].replace('-', '+').replace('_', '/')));
				// this.id = payload.id;

				// Update deviceToken:
				notification.updateDeviceToken();

				return resolve();
			} catch (error) {
				this.logout();
				return reject('Error encountered while setting session.');
			}
		});
	}
}

export default new SessionService();
