import { AsyncStorage } from 'react-native';
import BackgroundGeolocation from "react-native-background-geolocation";

import session from './session.service';

class GeolocationService {
	constructor() {
		BackgroundGeolocation.on('location', this.onLocation, this.onError);
		BackgroundGeolocation.on('geofence', this.onLocation, this.onError);
		BackgroundGeolocation.on('geofenceschange', this.onLocation, this.onError);
		BackgroundGeolocation.on('http', this.onLocation, this.onError);
		BackgroundGeolocation.on('motionchange', this.onLocation, this.onError);

		BackgroundGeolocation.configure({
			// Common
			stopOnStationary: true,
			// Activity Recognition
			activityRecognitionInterval: 30000,
			stopTimeout: 1,
			// HTTP
			url: 'http://yourserver.com/locations',
			batchSync: false,
			autoSync: true,
			headers: {
				"X-FOO": "bar"
			},
			params: {
				"auth_token": "maybe_your_server_authenticates_via_token_YES?"
			},
			// Application
			debug: true,
			logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
			stopOnTerminate: false,
			startOnBoot: true,
			// Geofence
			geofenceProximityRadius: session.distance
		});
	}

	onLocation(location) {
		console.log('- [event] location: ', location);
	}
	onError(error) {
		console.warn('- [event] location error ', error);
	}

	removeListeners() {
		BackgroundGeolocation.removeListeners();
	}

	setConfig(config) {
		BackgroundGeolocation.setConfig(config, () => {
			BackgroundGeolocation.getState(state => {
				console.log(state);
			});
		});
	}

	start() {
		BackgroundGeolocation.getState(state => {
			if (!state.enabled) {
				BackgroundGeolocation.start(() => {
					console.log("- Start success");
				});
			}
		});
	}

	stop() {
		BackgroundGeolocation.getState(state => {
			if (state.enabled) {
				BackgroundGeolocation.stop(() => {
					console.log("- Stop success");
				});
			}
		});
	}
}

export default new GeolocationService();