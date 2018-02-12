/**
|--------------------------------------------------
| 										MODES
|--------------------------------------------------
| 0: loading
| 1: logged in
| 2: logged out
| 3: new user
*/

const mode = (state = 0, action) => {
	switch (action.type) {
		case 'SET_MODE':
			return action.mode;
		default:
			return state;
	}
}

export default mode;