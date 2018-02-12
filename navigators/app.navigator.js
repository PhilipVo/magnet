import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Login from '../components/login';

const Navigator = StackNavigator(
	{
		Login: { screen: Login },
	},
	{
		cardStyle: { backgroundColor: 'transparent' },
		headerMode: 'none',
		initialRouteName: 'Login'
	}
);

const AppNavigator = ({ dispatch, appNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: appNavigator })} />
);

const mapStateToProps = state => ({
	appNavigator: state.appNavigator,
});

module.exports = {
	Navigator: Navigator,
	AppNavigator: connect(mapStateToProps)(AppNavigator)
};