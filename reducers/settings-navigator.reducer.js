import { NavigationActions } from 'react-navigation';

import { Navigator } from '../navigators/settings.navigator';
const initialNavState = Navigator.router.getStateForAction(
	NavigationActions.init()
);

const settingsNavigator = (state = initialNavState, action) => {
	let nextState;
	switch (action.type) {
		case 'SETTINGS_BACK':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.back(),
				state
			);
			break;
		case 'SETTINGS_PASSWORD':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Password' }),
				state
			);
			break;
		case 'SETTINGS_PREFERENCES':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Preferences' }),
				state
			);
			break;
		default:
			nextState = Navigator.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}

export default settingsNavigator;