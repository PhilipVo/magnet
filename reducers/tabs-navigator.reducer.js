import { NavigationActions } from 'react-navigation';

import { Navigator } from '../navigators/tabs.navigator';
const initialNavState = Navigator.router.getStateForAction(
	NavigationActions.init()
);

const tabsNavigator = (state = initialNavState, action) => {
	let nextState;
	switch (action.type) {
		case 'TABS_PROSPECTS':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'PROSPECTS' }),
				state
			);
			break;
		case 'TABS_QUALIFIED':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Qualified' }),
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