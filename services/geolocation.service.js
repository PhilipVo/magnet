import { AsyncStorage } from 'react-native';
import BackgroundGeolocation from "react-native-background-geolocation";

class GeolocationService {
	constructor() {
		BackgroundGeolocation.on('location', this.onLocation, this.onError);

		BackgroundGeolocation.configure({
			// Geolocation Config
			desiredAccuracy: 0,
			distanceFilter: 10,
			// Activity Recognition
			stopTimeout: 1,
			// Application config
			debug: true,
			logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
			stopOnTerminate: false,
			startOnBoot: true,
			// HTTP / SQLite config
			url: 'http://yourserver.com/locations',
			batchSync: false,
			autoSync: true,
			headers: {
				"X-FOO": "bar"
			},
			params: {
				"auth_token": "maybe_your_server_authenticates_via_token_YES?"
			}
		}, (state) => {
			console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

			if (!state.enabled) {
				BackgroundGeolocation.start(function () {
					console.log("- Start success");
				});
			}
		});
	}

	removeListeners() {
		BackgroundGeolocation.removeListeners();
	}
}

export default new HttpService();