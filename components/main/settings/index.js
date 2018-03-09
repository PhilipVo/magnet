import React, { Component } from 'react';
import {
	Image,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { colors } from '../../../etc/constants';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bio: '',
			email: '',
			first: '',
			last: '',
			push: false,
			user: {}
		};
	}

	componentDidMount() {
		this.setState({
			bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			email: 'elliot@young.com',
			first: 'Elliot',
			last: 'Young',
			push: false,
			user: {
				bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				email: 'elliot@young.com',
				first: 'Elliot',
				last: 'Young',
				push: false,
			}
		});
	}

	render() {
		const { user } = this.state;
		const valid = this.state.bio != this.state.user.bio ||
			this.state.email != this.state.user.email ||
			this.state.first != this.state.user.first ||
			this.state.last != this.state.user.last ||
			this.state.push != this.state.user.push;

		return (
			<View style={{ flex: 1 }}>
				{/* Header */}
				<View style={styles.header}>
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon color={colors.darkGray} name='menu' onPress={this.props.mainToggle} size={40} />
					</View>
					<View style={{ flex: 3 }}>
						<Text style={{ color: colors.darkGray, fontWeight: 'bold', textAlign: 'center' }}>
							Settings
						</Text>
					</View>
					<View style={{ flex: 1 }} />
				</View>

				{/* Body */}
				<View style={{ flex: 11 }}>
					<KeyboardAwareScrollView>
						<View style={{ alignItems: 'center', flex: 1, marginBottom: 15 }}>
							<TouchableHighlight onPress={this.props.mainMyPhotos}>
								<Image
									source={{ uri: 'https://media.tmz.com/2017/08/16/081617-chris-brown-primary-1.jpg' }}
									style={{ borderRadius: 50, height: 100, width: 100 }} />
							</TouchableHighlight>

							<TouchableHighlight onPress={this.props.mainMyPhotos} style={{ marginBottom: 10 }}>
								<Text style={{ color: colors.blue, fontSize: 10, fontWeight: 'bold' }}>
									Change Profile/Background Picture
						</Text>
							</TouchableHighlight>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										First Name
									</Text>
								</View>
								<View style={{ flex: 2, padding: 10 }}>
									<TextInput
										autoCorrect={false}
										onChangeText={first => this.setState({ first: first })}
										style={{ color: colors.darkGray }}
										value={this.state.first} />
								</View>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Last Name
									</Text>
								</View>
								<View style={{ flex: 2, padding: 10 }}>
									<TextInput
										autoCorrect={false}
										onChangeText={last => this.setState({ last: last })}
										style={{ color: colors.darkGray }}
										value={this.state.last} />
								</View>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Email
									</Text>
								</View>
								<View style={{ flex: 2, padding: 10 }}>
									<TextInput
										autoCapitalize='none'
										autoCorrect={false}
										keyboardType='email-address'
										onChangeText={email => this.setState({ email: email })}
										style={{ color: colors.darkGray }}
										value={this.state.email} />
								</View>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Bio
									</Text>
								</View>
								<View style={{ flex: 2, padding: 10 }}>
									<TextInput
										onChangeText={bio => this.setState({ bio: bio })}
										multiline={true}
										value={this.state.user.bio}
										style={{ color: colors.darkGray }}
										value={this.state.bio} />
								</View>
							</View>

							<View style={styles.row}>
								<View style={[styles.label, { flex: 3 }]}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Push Notifications
									</Text>
								</View>
								<TouchableHighlight
									onPress={() => this.setState({ push: this.state.push ? false : true })}
									style={[
										styles.toggle,
										{ backgroundColor: this.state.push ? colors.green : colors.darkGray }
									]}>
									<Text style={{ color: 'white' }}>
										{this.state.push ? 'On' : 'Off'}
									</Text>
								</TouchableHighlight>
							</View>

							{
								valid ?
									<TouchableHighlight
										onPress={() => { }}
										style={[styles.button, styles.save]}>
										<Text style={[styles.saveText, { color: colors.blue }]}>
											Save Changes
										</Text>
									</TouchableHighlight> :
									<View style={[styles.button, styles.save, { borderWidth: 0 }]}>
										<Text style={[styles.saveText, { color: colors.lightGray }]}>
											Save Changes
										</Text>
									</View>
							}

							<TouchableHighlight
								onPress={this.props.settingsPassword}
								style={[styles.button, { backgroundColor: colors.blue }]}>
								<Text style={{ color: 'white', flex: 1, textAlign: 'center' }}>
									Change Password
								</Text>
							</TouchableHighlight>

							<TouchableHighlight
								onPress={this.props.settingsPreferences}
								style={[styles.button, { backgroundColor: colors.blue }]}>
								<Text style={{ color: 'white', flex: 1, textAlign: 'center' }}>
									Edit Preferences
								</Text>
							</TouchableHighlight>

						</View>
					</KeyboardAwareScrollView>
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		marginHorizontal: 20,
		marginVertical: 5,
		padding: 10
	},
	label: {
		borderRightColor: colors.darkGray,
		borderRightWidth: 1,
		flex: 1,
		padding: 10,
	},
	header: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10
	},
	row: {
		borderColor: colors.darkGray,
		borderWidth: 1,
		flexDirection: 'row',
		marginHorizontal: 20,
		marginVertical: 5
	},
	save: {
		backgroundColor: 'white',
		borderColor: colors.blue,
		borderWidth: 1,
		flex: 1
	},
	saveText: {
		flex: 1,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	toggle: {
		alignItems: 'center',
		backgroundColor: colors.green,
		flex: 1,
		padding: 10
	}
});

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
	settingsPassword: () => dispatch({ type: 'SETTINGS_PASSWORD' }),
	settingsPreferences: () => dispatch({ type: 'SETTINGS_PREFERENCES' }),
	mainToggle: () => dispatch({ type: 'MAIN_TOGGLE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);