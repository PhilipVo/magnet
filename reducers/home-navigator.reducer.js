import { NavigationActions } from 'react-navigation';

import { Navigator } from '../navigators/home.navigator';
const initialNavState = Navigator.router.getStateForAction(
	NavigationActions.init()
);

const homeNavigator = (state = initialNavState, action) => {
	let nextState;
	switch (action.type) {
		case 'HOME_BACK':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.back(),
				state
			);
			break;
		case 'HOME_CHAT':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Chat', params: action.params }),
				state
			);
			break;
		case 'HOME_PHOTOS':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Photos', params: action.params }),
				state
			);
			break;
		case 'HOME_PROFILE':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Profile', params: action.params }),
				state
			);
			break;
		default:
			nextState = Navigator.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}

export default homeNavigator;