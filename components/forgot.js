import React, { Component } from 'react';
import {
	Keyboard,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../etc/constants';

class Forgot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			disabled: false,
			error: '',
			sent: false
		};
	}

	render() {
		return (
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
						<Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>
							It happens sometimes.
						</Text>
						<Text style={{ color: 'white', textAlign: 'center' }}>
							{"Please enter your email\nand we'll send you a new password"}
						</Text>
					</View>

					{/* Form */}
					<View style={{ alignItems: 'center', flex: 2, margin: 50 }}>
						{/* Email */}
						<View style={{ flexDirection: 'row', marginVertical: 5 }}>
							<View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
								<TextInput
									autoCapitalize='none'
									autoCorrect={false}
									keyboardType='email-address'
									onChangeText={value => this.setState({ email: value })}
									placeholder='Email'
									placeholderTextColor={colors.lightGray}
									style={{ color: colors.darkGray, fontWeight: 'bold' }} />
							</View>
						</View>

						{/* Submit */}
						<TouchableHighlight
							onPress={this.submit}
							style={{ flexDirection: 'row', marginBottom: 5, marginTop: 20 }}>
							<LinearGradient
								colors={[colors.lightGreen, colors.darkGreen]}
								style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
								<Text style={{ color: 'white', flex: 1, fontWeight: 'bold', textAlign: 'center' }}>
									{this.state.sent ? 'New Password Sent!' : 'Request New Password'}
								</Text>
							</LinearGradient>
						</TouchableHighlight>

						{
							this.state.error.length > 0 &&
							<Text style={{ color: 'red' }}>{this.state.error}</Text>
						}

						<Text
							onPress={this.props.appBack}
							style={{ color: colors.blue, fontSize: 12, fontWeight: 'bold', padding: 5 }}>
							Go Back to Login Screen
						</Text>

					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	appBack: mode => { dispatch({ type: 'APP_BACK' }); }
});

export default connect(null, mapDispatchToProps)(Forgot);