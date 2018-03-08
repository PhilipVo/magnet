import { combineReducers } from 'redux';

import appNavigator from './app-navigator.reducer';
import ftueNavigator from './ftue-navigator.reducer';
import homeNavigator from './home-navigator.reducer';
import mainNavigator from './main-navigator.reducer';
import mode from './mode.reducer';
import settingsNavigator from './settings-navigator.reducer';
import tabsNavigator from './tabs-navigator.reducer';

const reducer = combineReducers({
	appNavigator,
	ftueNavigator,
	homeNavigator,
	mainNavigator,
	mode,
	settingsNavigator,
	tabsNavigator
});

export default reducer;