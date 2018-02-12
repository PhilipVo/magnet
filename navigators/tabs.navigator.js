import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';

import Prospects from '../components/tabs/prospects';
import Qualified from '../components/tabs/qualified';

const Navigator = TabNavigator(
	{
		Prospects: { screen: Prospects },
		Qualified: { screen: Qualified }
	},
	{
		headerMode: 'none',
		initialRouteName: 'Prospects',
		navigationOptions: { tabBarVisible: false },
		order: ['Qualified', 'Prospects'],
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