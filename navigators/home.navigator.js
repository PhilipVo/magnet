import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Chat from '../components/main/home/chat';
import Home from '../components/main/home/home';
import Profile from '../components/main/home/profile';

const Navigator = StackNavigator(
	{
		Chat: { screen: Chat },
		Home: { screen: Home },
		Profile: { screen: Profile }
	},
	{
		cardStyle: { backgroundColor: 'transparent' },
		headerMode: 'none',
		initialRouteName: 'Profile'
	}
);

const HomeNavigator = ({ dispatch, homeNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: homeNavigator })} />
);

const mapStateToProps = state => ({
	homeNavigator: state.homeNavigator,
});

module.exports = {
	Navigator: Navigator,
	HomeNavigator: connect(mapStateToProps)(HomeNavigator)
};