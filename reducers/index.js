import { combineReducers } from 'redux';

import appNavigator from './app-navigator.reducer';
import ftueNavigator from './ftue-navigator.reducer';
import mainNavigator from './main-navigator.reducer';
import mode from './mode.reducer';
import tabsNavigator from './tabs-navigator.reducer';

const reducer = combineReducers({
	appNavigator,
	ftueNavigator,
	mainNavigator,
	mode,
	tabsNavigator
});

export default reducer;