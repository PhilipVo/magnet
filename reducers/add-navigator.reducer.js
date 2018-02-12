import { NavigationActions } from 'react-navigation';

import { Navigator } from '../navigators/add.navigator';
const initialNavState = Navigator.router.getStateForAction(
	NavigationActions.init()
);

const addNavigator = (state = initialNavState, action) => {
	let nextState;
	switch (action.type) {
		case 'ADD_BACK':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.back(),
				state
			);
			break;
		case 'ADD_TEAMS':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Teams', params: action.params }),
				state
			);
			break;
		default:
			nextState = Navigator.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}

export default addNavigator;