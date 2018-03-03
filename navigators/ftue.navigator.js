import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Body from '../components/ftue/body';
import Info from '../components/ftue/info';
import Pictures from '../components/ftue/pictures';

const Navigator = StackNavigator(
	{
		Body: { screen: Body },
		Info: { screen: Info },
		Pictures: { screen: Pictures }
	},
	{
		cardStyle: { backgroundColor: 'transparent' },
		headerMode: 'none',
		initialRouteName: 'Body'
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