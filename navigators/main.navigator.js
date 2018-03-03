import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, DrawerNavigator } from 'react-navigation';

import { HomeNavigator } from './home.navigator';

import Settings from '../components/main/settings';

import { constants } from '../styles';

const Navigator = DrawerNavigator(
	{
		Home: { screen: HomeNavigator },
		Settings: { screen: Settings },
	},
	{
		contentOptions: {
			inactiveTintColor: 'white',
		},
		drawerBackgroundColor: constants.blue,
		initialRouteName: 'Home',
		order: ['Home', 'Settings'],
	}
);

const MainNavigator = ({ dispatch, mainNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: mainNavigator })} />
);

const mapStateToProps = state => ({
	mainNavigator: state.mainNavigator,
});

module.exports = {
	Navigator: Navigator,
	MainNavigator: connect(mapStateToProps)(MainNavigator)
};