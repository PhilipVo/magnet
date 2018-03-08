import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Settings from '../components/main/settings';
import Password from '../components/main/settings/password';
import Preferences from '../components/main/settings/preferences';

const Navigator = StackNavigator(
	{
		Password: { screen: Password },
		Preferences: { screen: Preferences },
		Settings: { screen: Settings }
	},
	{
		cardStyle: { backgroundColor: 'white' },
		headerMode: 'none',
		initialRouteName: 'Settings'
	}
);

const SettingsNavigator = ({ dispatch, settingsNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: settingsNavigator })} />
);

const mapStateToProps = state => ({
	settingsNavigator: state.settingsNavigator,
});

module.exports = {
	Navigator: Navigator,
	SettingsNavigator: connect(mapStateToProps)(SettingsNavigator)
};