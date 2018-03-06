import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { HomeNavigator } from '../../../navigators/home.navigator';

class HomeWrapper extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<HomeNavigator navigation={this.props.navigation} />
			</View>
		);
	}
}

HomeWrapper.router = HomeNavigator.router;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);