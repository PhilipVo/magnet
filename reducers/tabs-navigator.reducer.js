import { NavigationActions } from 'react-navigation';

import { Navigator } from '../navigators/tabs.navigator';
const initialNavState = Navigator.router.getStateForAction(
	NavigationActions.init()
);

const tabsNavigator = (state = initialNavState, action) => {
	let nextState;
	switch (action.type) {
		case 'TABS_ADD':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Add' }),
				state
			);
			break;
		case 'TABS_FEED':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Feed' }),
				state
			);
			break;
		case 'TABS_MANAGE':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Manage' }),
				state
			);
			break;
		default:
			nextState = Navigator.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}

export default tabsNavigator;