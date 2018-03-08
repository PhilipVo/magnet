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

class Password extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.user = {};
	}

	componentDidMount() { }

	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* Header */}
				<View style={styles.header}>
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon color={colors.darkGray} name='chevron-left' onPress={this.props.settingsBack} size={40} />
					</View>
					<View style={{ flex: 3 }}>
						<Text style={{ color: colors.darkGray, fontWeight: 'bold', textAlign: 'center' }}>
							Change Password
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
										onChangeText={first => this.user.first = first}
										placeholder='Elliot'
										placeholderTextColor={colors.lightGray}
										style={{ color: colors.darkGray }} />
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
											onChangeText={last => this.user.last = last}
											placeholder='Young'
											placeholderTextColor={colors.lightGray}
											style={{ color: colors.darkGray }} />
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
										onChangeText={email => this.user.email = email}
										placeholder='elliot@young.com'
										placeholderTextColor={colors.lightGray}
										style={{ color: colors.darkGray }} />
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
										onChangeText={bio => this.user.bio = bio}
										multiline={true}
										value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
										style={{ color: colors.darkGray }} />
								</View>
							</View>

							<View style={styles.row}>
								<View style={[styles.label, { flex: 3 }]}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Push Notifications
									</Text>
								</View>
								<TouchableHighlight
									onPress={() => this.setState({ push: this.state.push ? false : true})}
									style={[
										styles.toggle,
										{ backgroundColor: this.state.push ? colors.green : colors.darkGray}
									]}>
									<Text style={{ color: 'white' }}>
										{this.state.push ? 'On' : 'Off'}
									</Text>
								</TouchableHighlight>
							</View>

							<View style={[styles.button, styles.save]}>
								<Text style={{ color: colors.blue, flex: 1, textAlign: 'center' }}>
									Save Changes
								</Text>
							</View>

							<View style={[styles.button, { backgroundColor: colors.blue }]}>
								<Text style={{ color: 'white', flex: 1, textAlign: 'center' }}>
									Change Password
								</Text>
							</View>

							<View style={[styles.button, { backgroundColor: colors.blue }]}>
								<Text style={{ color: 'white', flex: 1, textAlign: 'center' }}>
									Edit Preferences
								</Text>
							</View>

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
		borderWidth: 1
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
	settingsBack: () => dispatch({ type: 'SETTINGS_BACK' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);