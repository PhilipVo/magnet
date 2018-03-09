import React, { Component } from 'react';
import {
	Image,
	Keyboard,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { colors } from '../../../etc/constants';

class Password extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirm: '',
			old: '',
			password: ''
		};
	}

	render() {
		const valid = this.state.confirm && this.state.old && this.state.password &&
			this.state.confirm == this.state.password;
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
				<View style={{ flex: 11, marginBottom: 15 }}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={{ flex: 1 }}>

							<View style={{ flex: 1 }}>
								<View style={styles.row}>
									<View style={styles.label}>
										<Text style={{ color: colors.darkGray, fontSize: 12, fontWeight: 'bold' }}>
											Old Password
									</Text>
									</View>
									<View style={{ flex: 3, padding: 10 }}>
										<TextInput
											autoCapitalize='none'
											autoCorrect={false}
											onChangeText={old => this.setState({ old: old })}
											secureTextEntry={true}
											style={{ color: colors.darkGray }} />
									</View>
								</View>

								<View style={styles.row}>
									<View style={styles.label}>
										<Text style={{ color: colors.darkGray, fontSize: 12, fontWeight: 'bold' }}>
											New Password
									</Text>
									</View>
									<View style={{ flex: 3, padding: 10 }}>
										<TextInput
											autoCapitalize='none'
											autoCorrect={false}
											onChangeText={password => this.setState({ password: password })}
											secureTextEntry={true}
											style={{ color: colors.darkGray }} />
									</View>
								</View>

								<View style={styles.row}>
									<View style={styles.label}>
										<Text style={{ color: colors.darkGray, fontSize: 12, fontWeight: 'bold' }}>
											Confirm Password
									</Text>
									</View>
									<View style={{ flex: 3, padding: 10 }}>
										<TextInput
											autoCapitalize='none'
											autoCorrect={false}
											onChangeText={confirm => this.setState({ confirm: confirm })}
											secureTextEntry={true}
											style={{ color: colors.darkGray }} />
									</View>
								</View>
							</View>

							<View style={{ flex: 1, justifyContent: 'flex-end' }}>
								{
									valid ?
										<TouchableHighlight
											onPress={() => { }}
											style={[styles.button, styles.save]}>
											<Text style={[styles.saveText, { color: colors.blue }]}>
												Save New Password
											</Text>
										</TouchableHighlight> :
										<View style={[styles.button, styles.save, { borderWidth: 0 }]}>
											<Text style={[styles.saveText, { color: colors.lightGray }]}>
												Save New Password
										</Text>
										</View>
								}
							</View>

						</View>
					</TouchableWithoutFeedback>
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
		borderWidth: 1
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
	settingsBack: () => dispatch({ type: 'SETTINGS_BACK' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);