import { NavigationActions } from 'react-navigation';

import { Navigator } from '../navigators/ftue.navigator';
const initialNavState = Navigator.router.getStateForAction(
	NavigationActions.init()
);

const ftueNavigator = (state = initialNavState, action) => {
	let nextState;
	switch (action.type) {
		case 'FTUE_BACK':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.back(),
				state
			);
			break;
		case 'FTUE_COMPLETE':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Complete' }),
				state
			);
			break;
		case 'FTUE_PICTURES':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Pictures' }),
				state
			);
			break;
		default:
			nextState = Navigator.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}

export default ftueNavigator;