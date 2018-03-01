import { NavigationActions } from 'react-navigation';

import { Navigator } from '../navigators/app.navigator';
const initialNavState = Navigator.router.getStateForAction(
	NavigationActions.init()
);

const appNavigator = (state = initialNavState, action) => {
	let nextState;
	switch (action.type) {
		case 'APP_BACK':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.back(),
				state
			);
			break;
		case 'APP_FORGOT':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Forgot', params: action.params }),
				state
			);
			break;
		case 'APP_LOGIN':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Login', params: action.params }),
				state
			);
			break;
		case 'APP_WELCOME':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Welcome' }),
				state
			);
			break;
		default:
			nextState = Navigator.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}

export default appNavigator;