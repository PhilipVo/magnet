import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Sports from '../components/tabs/add/sports';
import Teams from '../components/tabs/add/teams';

const Navigator = StackNavigator(
	{
		Sports: { screen: Sports },
		Teams: { screen: Teams }
	},
	{
		cardStyle: { backgroundColor: 'transparent' },
		headerMode: 'none',
		initialRouteName: 'Sports'
	}
);

const AddNavigator = ({ dispatch, addNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: addNavigator })} />
);

const mapStateToProps = state => ({
	addNavigator: state.addNavigator,
});

module.exports = {
	Navigator: Navigator,
	AddNavigator: connect(mapStateToProps)(AddNavigator)
};