import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Info from '../components/ftue/info';

const Navigator = StackNavigator(
	{
		Info: { screen: Info }
	},
	{
		cardStyle: { backgroundColor: 'transparent' },
		headerMode: 'none',
		initialRouteName: 'Info'
	}
);

const FTUENavigator = ({ dispatch, ftueNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: ftueNavigator })} />
);

const mapStateToProps = state => ({
	ftueNavigator: state.ftueNavigator,
});

module.exports = {
	Navigator: Navigator,
	FTUENavigator: connect(mapStateToProps)(FTUENavigator)
};