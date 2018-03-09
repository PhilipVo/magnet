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
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { colors } from '../../../etc/constants';

class Preferences extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bio: '',
			distance: 25,
			email: '',
			first: '',
			last: '',
			match: 50,
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
						<Icon color={colors.darkGray} name='chevron-left' onPress={this.props.settingsBack} size={40} />
					</View>
					<View style={{ flex: 3 }}>
						<Text style={{ color: colors.darkGray, fontWeight: 'bold', textAlign: 'center' }}>
							Preferences
						</Text>
					</View>
					<View style={{ flex: 1 }} />
				</View>

				{/* Body */}
				<View style={{ flex: 11 }}>
					<KeyboardAwareScrollView>
						<View style={{ alignItems: 'center', flex: 1, marginBottom: 15 }}>

							<View style={[styles.row, { borderWidth: 0 }]}>
								<View style={{ borderColor: colors.darkGray, borderWidth: 1, flex: 1, padding: 10 }}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Match %
									</Text>
								</View>
								<View style={{ flex: 3, justifyContent: 'center', marginHorizontal: 10 }}>
									<Slider
										minimumValue={0}
										minimumTrackTintColor={colors.blue}
										maximumValue={100}
										maximumTrackTintColor={colors.darkGray}
										onValueChange={value => this.setState({ match: value })}
										step={1}
										style={styles.slider}
										thumbStyle={{ height: 15, width: 15 }}
										thumbTintColor={colors.blue}
										trackStyle={{ height: 1 }}
										value={this.state.match} />
									<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
										<Text style={{ color: colors.darkGray, fontSize: 10 }}>0%</Text>
										<Text style={{ color: colors.blue, fontSize: 10, fontWeight: 'bold' }}>
											{this.state.match + '%'}
										</Text>
										<Text style={{ color: colors.darkGray, fontSize: 10 }}>100%</Text>
									</View>
								</View>
							</View>

							<View style={[styles.row, { borderWidth: 0, marginBottom: 20 }]}>
								<View style={{ borderColor: colors.darkGray, borderWidth: 1, flex: 1, padding: 10 }}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Distance
									</Text>
								</View>
								<View style={{ flex: 3, justifyContent: 'center', marginHorizontal: 10 }}>
									<Slider
										minimumValue={0}
										minimumTrackTintColor={colors.blue}
										maximumValue={50}
										maximumTrackTintColor={colors.darkGray}
										onValueChange={value => this.setState({ distance: value })}
										step={1}
										style={styles.slider}
										thumbStyle={{ height: 15, width: 15 }}
										thumbTintColor={colors.blue}
										trackStyle={{ height: 1 }}
										value={this.state.distance} />
									<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
										<Text style={{ color: colors.darkGray, fontSize: 10 }}>0mi</Text>
										<Text style={{ color: colors.blue, fontSize: 10, fontWeight: 'bold' }}>
											{this.state.distance + 'mi'}
										</Text>
										<Text style={{ color: colors.darkGray, fontSize: 10 }}>50mi</Text>
									</View>
								</View>
							</View>

							{/* Your Details */}
							<View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
								<Text style={{ color: colors.blue, flex: 1, fontSize: 16, fontWeight: 'bold' }}>
									Your Details:
								</Text>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Your Height
									</Text>
								</View>
								<View style={{ flex: 1, padding: 10 }}>
									<Text style={{ color: colors.darkGray }}>
										{this.state.first}
									</Text>
								</View>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Your Gender
									</Text>
								</View>
								<View style={{ flex: 1, padding: 10 }}>
									<Text style={{ color: colors.darkGray }}>
										{this.state.first}
									</Text>
								</View>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Your Sexual Preference
									</Text>
								</View>
								<View style={{ flex: 1, padding: 10 }}>
									<Text style={{ color: colors.darkGray }}>
										{this.state.first}
									</Text>
								</View>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Your Vices
									</Text>
								</View>
								<View style={{ flex: 1, padding: 10 }}>
									<Text style={{ color: colors.darkGray }}>
										{this.state.first}
									</Text>
								</View>
							</View>

							{/* Desired Details */}
							<View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
								<Text style={{ color: colors.blue, flex: 1, fontSize: 16, fontWeight: 'bold' }}>
									Desired Details:
								</Text>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Your Height
									</Text>
								</View>
								<View style={{ flex: 1, padding: 10 }}>
									<Text style={{ color: colors.darkGray }}>
										{this.state.first}
									</Text>
								</View>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Your Body Type
									</Text>
								</View>
								<View style={{ flex: 1, padding: 10 }}>
									<Text style={{ color: colors.darkGray }}>
										{this.state.first}
									</Text>
								</View>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Your Sexual Preference
									</Text>
								</View>
								<View style={{ flex: 1, padding: 10 }}>
									<Text style={{ color: colors.darkGray }}>
										{this.state.first}
									</Text>
								</View>
							</View>

							<View style={styles.row}>
								<View style={styles.label}>
									<Text style={{ color: colors.darkGray, fontWeight: 'bold' }}>
										Your Vices
									</Text>
								</View>
								<View style={{ flex: 1, padding: 10 }}>
									<Text style={{ color: colors.darkGray }}>
										{this.state.first}
									</Text>
								</View>
							</View>

							{
								valid ?
									<TouchableHighlight
										onPress={() => { }}
										style={[styles.button, styles.save]}>
										<Text style={[styles.saveText, { color: colors.blue }]}>
											Save Preferences
										</Text>
									</TouchableHighlight> :
									<View style={[styles.button, styles.save, { borderWidth: 0 }]}>
										<Text style={[styles.saveText, { color: colors.lightGray }]}>
											Save Preferences
										</Text>
									</View>
							}

							<TouchableHighlight
								onPress={this.props.settingsPassword}
								style={[styles.button]}>
								<Text style={styles.del}>Delete account</Text>
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
	del: {
		color: 'black',
		flex: 1,
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	label: {
		borderRightColor: colors.darkGray,
		borderRightWidth: 1,
		flex: 2,
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
	slider: {
		borderLeftColor: colors.blue,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderRightColor: colors.darkGray,
		height: 15,
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

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);