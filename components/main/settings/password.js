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
			error: 'null',
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
					<View style={{ flex: 1 }}>
						<Text
							onPress={this.props.settingsBack}
							style={{ color: colors.darkGray, fontWeight: 'bold', textAlign: 'center' }}>
							Cancel
							</Text>
					</View>
					<View style={{ flex: 3 }}>
						<Text style={{ color: colors.darkGray, fontWeight: 'bold', textAlign: 'center' }}>
							Change Password
						</Text>
					</View>
					<View style={{ flex: 1 }}>
						<Text
							onPress={() => { }}
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
				<View style={{ flex: 11, marginBottom: 15 }}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
	}
});

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
	settingsBack: () => dispatch({ type: 'SETTINGS_BACK' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);