import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';

import Add from '../components/tabs/add';
import Feed from '../components/tabs/feed';
import Manage from '../components/tabs/manage';

const Navigator = TabNavigator(
	{
		Add: { screen: Add },
		Feed: { screen: Feed },
		Manage: { screen: Manage },
	},
	{
		headerMode: 'none',
		initialRouteName: 'Feed',
		// navigationOptions: { tabBarVisible: false }
		order: ['Feed', 'Add', 'Manage'],
		tabBarOptions: { showLabel: false }
	}
);

const TabsNavigator = ({ dispatch, tabsNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: tabsNavigator })} />
);

const mapStateToProps = state => ({
	tabsNavigator: state.tabsNavigator,
});

module.exports = {
	Navigator: Navigator,
	TabsNavigator: connect(mapStateToProps)(TabsNavigator)
};