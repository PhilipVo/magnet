import { NavigationActions } from 'react-navigation';

import { Navigator } from '../navigators/main.navigator';
const initialNavState = Navigator.router.getStateForAction(
	NavigationActions.init()
);

const mainNavigator = (state = initialNavState, action) => {
	let nextState;
	switch (action.type) {
		case 'MAIN_HOME':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Home' }),
				state
			);
			break;
		case 'MAIN_SETTINGS':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Settings' }),
				state
			);
			break;
		case 'MAIN_TOGGLE':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'DrawerToggle' }),
				state
			);
			break;
		default:
			nextState = Navigator.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}

export default mainNavigator;