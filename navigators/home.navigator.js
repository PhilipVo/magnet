import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Home from '../components/main/home';
import Chat from '../components/main/home/chat';
import Photos from '../components/main/home/photos';
import Profile from '../components/main/home/profile';

const Navigator = StackNavigator(
	{
		Chat: { screen: Chat },
		Home: { screen: Home },
		Photos: { screen: Photos },
		Profile: { screen: Profile }
	},
	{
		cardStyle: { backgroundColor: 'white' },
		headerMode: 'none',
		initialRouteName: 'Home'
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