import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';

import { FTUENavigator } from '../../../navigators/ftue.navigator';

const styles = StyleSheet.create({
	background: {
		height: Dimensions.get('window').height,
		position: 'absolute',
		width: Dimensions.get('window').width
	}
})

class Add extends Component {
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => <Icon color={tintColor} name='heart' size={30} />
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Image

					style={styles.background} />
				<FTUENavigator />
			</View>
		);
	}
}

export default connect()(Add);