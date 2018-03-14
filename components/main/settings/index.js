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
import ActionSheet from 'react-native-custom-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
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
			isProfile: false,
			last: '',
			location: false,
			profile: 'https://media.tmz.com/2017/08/16/081617-chris-brown-primary-1.jpg',
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
			location: false,
			push: false,
			user: {
				bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				email: 'elliot@young.com',
				first: 'Elliot',
				last: 'Young',
				location: false,
				push: false,
			}
		});
	}

	openCamera = () => {
		ImagePicker.openCamera({
			cropperCircleOverlay: this.state.isProfile,
			cropping: this.state.isProfile,
			mediaType: 'photo',
			useFrontCamera: this.state.isProfile
		}).then(image => this.setState({ profile: image.path }))
			.catch(() => { });
	}

	openPicker = () => {
		ImagePicker.openPicker({
			cropperCircleOverlay: this.state.isProfile,
			cropping: this.state.isProfile,
			mediaType: 'photo'
		}).then(image => this.setState({ profile: image.path }))
			.catch(() => { });
	}

	save = () => {
		this.setState({
			user: {
				bio: this.state.bio,
				email: this.state.email,
				first: this.state.first,
				last: this.state.last,
				location: this.state.location,
				push: this.state.push
			}
		});
	}

	render() {
		const { user } = this.state;
		const valid = this.state.bio != user.bio ||
			this.state.email != user.email ||
			this.state.first != user.first ||
			this.state.last != user.last ||
			this.state.location != user.location ||
			this.state.push != user.push;

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
					<View style={{ flex: 1 }}>
						<Text
							onPress={this.save}
							style={{
								color: valid ? colors.darkGray : colors.lightGray,
								fontWeight: valid ? 'bold' : 'normal',
								textAlign: 'center'
							}}>
							Save
						</Text>
					</View>
				</View>

				{/* Body */}
				<View style={{ flex: 11 }}>
					<KeyboardAwareScrollView>
						<View style={{ alignItems: 'center', flex: 1, marginBottom: 15 }}>
							<TouchableHighlight
								onPress={() => {
									this.setState(() => {
										return { isProfile: true }
									}, () => this.actionSheet.show());
								}}>
								<Image
									source={{ uri: this.state.profile }}
									style={{ borderRadius: 50, height: 100, width: 100 }} />
							</TouchableHighlight>

							<Text
								onPress={() => {
									this.setState(() => {
										return { isProfile: true }
									}, () => this.actionSheet.show());
								}}
								style={{ color: colors.blue, fontSize: 12, fontWeight: 'bold', padding: 5 }}>
								Change Profile Picture
							</Text>

							<Text
								onPress={() => {
									this.setState(() => {
										return { isProfile: false }
									}, () => this.actionSheet.show());
								}}
								style={{ color: colors.blue, fontSize: 12, fontWeight: 'bold', marginBottom: 5, padding: 5 }}>
								Change Background Picture
							</Text>

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

							<View style={styles.row}>
								<View style={[styles.label, { flex: 3 }]}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Location Services
									</Text>
								</View>
								<TouchableHighlight
									onPress={() => this.setState({ location: this.state.location ? false : true })}
									style={[
										styles.toggle,
										{ backgroundColor: this.state.location ? colors.green : colors.darkGray }
									]}>
									<Text style={{ color: 'white' }}>
										{this.state.location ? 'On' : 'Off'}
									</Text>
								</TouchableHighlight>
							</View>

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

				{/* ActionSheet for picture */}
				<ActionSheet
					ref={ref => this.actionSheet = ref}
					title={`How would you like to set your ${this.state.isProfile ? 'profile' : 'background'} picture?`}
					options={['Cancel', 'Use Photo Library', 'Use Camera']}
					cancelButtonIndex={0}
					onPress={index => {
						switch (index) {
							case 1:
								this.openPicker();
								break;
							case 2:
								this.openCamera();
								break;
							default:
						}
					}} />

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
	mainMyPhotos: () => dispatch({ type: 'MAIN_MY_PHOTOS' }),
	mainToggle: () => dispatch({ type: 'MAIN_TOGGLE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);