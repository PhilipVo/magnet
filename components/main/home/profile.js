import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { TabsNavigator } from '../../../navigators/tabs.navigator';

import { colors } from '../../../etc/constants';

class Profile extends Component {
	render() {
		return (
			<ImageBackground
				source={{ uri: 'https://timedotcom.files.wordpress.com/2016/07/wonder-woman1.jpg' }}
				style={{ flex: 1 }}>

				{/* Header */}
				<View style={styles.header}>
					<View style={styles.centeredView}>
						<Icon color={colors.lightGray} name='chevron-left' onPress={this.props.homeBack} size={40} />
					</View>
					<View style={{ flex: 4 }} />
				</View>

				{/* Body */}
				<View style={{ flex: 11 }}>
					<Text></Text>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	centeredView: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	header: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10
	}
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	homeBack: () => dispatch({ type: 'HOME_BACK' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);