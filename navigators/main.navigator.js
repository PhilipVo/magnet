import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, DrawerItems, DrawerNavigator } from 'react-navigation';

import { HomeNavigator } from './home.navigator';

import Invite from '../components/main/invite';
import MyPhotos from '../components/main/my-photos';
import Settings from '../components/main/settings';

import { colors } from '../etc/constants';

const Navigator = DrawerNavigator(
	{
		Home: { screen: HomeNavigator },
		'Invite Friends': { screen: Invite },
		'My Photos': { screen: MyPhotos },
		Settings: { screen: Settings },
	},
	{
		contentComponent: props => (
			<View style={{ flex: 1 }}>
				<View style={{ alignItems: 'center', flex: 2, justifyContent: 'center' }}>
					<Image
						source={{ uri: 'https://media.tmz.com/2017/08/16/081617-chris-brown-primary-1.jpg' }}
						style={{ borderRadius: 75, height: 150, width: 150 }} />
					<Text style={{ color: 'white', fontSize: 20, marginTop: 10 }}>Elliot Young</Text>
				</View>

				<View style={{ flex: 2, marginLeft: 20 }} >
					<TouchableHighlight
						onPress={() => props.navigation.navigate('Home')}
						style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}>
						<Text
							style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 16 }}>
							Home
						</Text>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => { }}
						style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}>
						<Text
							style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 16 }}>
							Invite Friends
						</Text>
					</TouchableHighlight><TouchableHighlight
						onPress={() => props.navigation.navigate('My Photos')}
						style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}>
						<Text
							style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 16 }}>
							My Photos
						</Text>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => props.navigation.navigate('Settings')}
						style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}>
						<Text
							style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 16 }}>
							Settings
						</Text>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => { }}
						style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}>
						<Text
							style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 16 }}>
							Logout
						</Text>
					</TouchableHighlight>
				</View>

				<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
					<Text style={{ color: 'white', fontSize: 12 }}>We'd love your</Text>
					<TouchableHighlight style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}>
						<Text style={{ color: 'white', fontSize: 12 }}>feedback!</Text>
					</TouchableHighlight>
				</View>
			</View>
		),
		contentOptions: {
			activeBackgroundColor: null,
			activeTintColor: 'white',
			inactiveTintColor: 'white',
			itemStyle: { borderBottomColor: 'white', borderBottomWidth: 1 },
			labelStyle: { fontSize: 16, margin: 0, marginTop: 25 },
		},
		drawerBackgroundColor: colors.blue,
		initialRouteName: 'My Photos'
	}
);

const MainNavigator = ({ dispatch, mainNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: mainNavigator })} />
);

const mapStateToProps = state => ({
	mainNavigator: state.mainNavigator,
});

module.exports = {
	Navigator: Navigator,
	MainNavigator: connect(mapStateToProps)(MainNavigator)
};