import { AsyncStorage } from 'react-native';
import PushNotification from 'react-native-push-notification';

import http from './http.service';

class NotificationService {
	constructor() {
		// Configure notifications:        
		PushNotification.configure({
			onRegister: device => AsyncStorage.setItem('deviceToken', device.token),
			permissions: {
				alert: true,
				badge: false,
				sound: true
			}
		});
	}

	updateDeviceToken() {
		AsyncStorage.getItem('deviceToken')
			.then(deviceToken => {
				if (deviceToken)
					return http.put('/api/users/update-device-token', JSON.stringify({ deviceToken: deviceToken }));
			}).catch(error => { });
	}
}

export default new NotificationService();