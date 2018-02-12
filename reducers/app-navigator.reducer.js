import { NavigationActions } from 'react-navigation';

import { Navigator } from '../navigators/app.navigator';
const initialNavState = Navigator.router.getStateForAction(
	NavigationActions.init()
);

const appNavigator = (state = initialNavState, action) => {
	let nextState;
	switch (action.type) {
		case 'APP_HOME':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'HOME' }),
				state
			);
			break;
		case 'APP_LOGIN':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Login' }),
				state
			);
			break;
		case 'APP_REGISTER':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Register' }),
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