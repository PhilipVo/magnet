import React, { Component } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
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
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon color={colors.lightGray} name='chevron-left' onPress={this.props.homeBack} size={40} />
					</View>
					<View style={{ flex: 4 }} />
				</View>

				{/* Body */}
				<View style={{ flex: 11, padding: 40, justifyContent: 'flex-end' }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon color={colors.green} name='star' size={40} />
						<Text style={{ color: 'white', fontSize: 40 }}>{this.props.first || 'Gal Gadot'}</Text>
					</View>

					<Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold', marginLeft: 50 }}>
						Amazonian, 12mi
					</Text>

					<TouchableHighlight
						onPress={() => this.props.homePhotos(this.props.id)}
						style={styles.viewPhotos}
						underlayColor='transparent'>
						<Text style={{ color: 'white', fontSize: 12 }}>View Photos</Text>
					</TouchableHighlight>

					<Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Bio:</Text>
					<ScrollView style={{ maxHeight: 150 }}>
						<Text style={{ color: 'white', fontSize: 14, marginHorizontal: 10 }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Text>
					</ScrollView>
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
	},
	viewPhotos: {
		alignItems: 'center',
		borderColor: 'white',
		borderRadius: 10,
		borderWidth: 0.3,
		justifyContent: 'center',
		marginBottom: 50,
		marginLeft: 40,
		marginTop: 20,
		padding: 2,
		width: 100
	}
});

const mapStateToProps = (state, props) => ({
	id: props.navigation.state.params.id
});

const mapDispatchToProps = dispatch => ({
	homeBack: () => dispatch({ type: 'HOME_BACK' }),
	homePhotos: id => dispatch({ type: 'HOME_PHOTOS', params: { id: id } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);