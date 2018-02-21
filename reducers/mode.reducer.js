/**
|--------------------------------------------------
| 										MODES
|--------------------------------------------------
	LOADING: when app is still loading.
	LOGGED_IN: when a current session exists.
	LOGGED_OUT: when no current session exists.
	NEW_USER: when registering.
*/

const mode = (state = 'LOADING', action) => {
	switch (action.type) {
		case 'SET_MODE':
			return action.mode;
		default:
			return state;
	}
}

export default mode;