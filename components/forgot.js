import React, { Component } from 'react';
import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { connect } from 'react-redux';
import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import session from '../services/session.service';

import styles, { constants } from '../styles';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: false,
			error: null,
			mode: 'login'
		};

		this.user = {
			email: '',
		};
	}

	facebookLogin = () => {
		if (!this.state.disabled) {
			this.setState({
				disbaled: true,
				error: null,
			});

			LoginManager.logInWithReadPermissions(['public_profile']).then(result => {
				if (result.isCancelled) this.setState({ disabled: false });
				else {
					const infoRequest = new GraphRequest('/me', null, (error, result) => {
						if (error) throw error.toString();
						else return session.facebookLogin({ id: result.id })
							.then(isNew => {
								if (isNew === true) this.props.setMode('NEW_USER');
								else this.props.setMode('LOGGED_IN');
							}).catch(error => {
								this.setState({
									disabled: false,
									error: typeof error === 'string' ? error : 'Oops, something went wrong.',
								});
							});
					});

					new GraphRequestManager().addRequest(infoRequest).start();
				}
			}).catch(error => {
				this.setState({
					disabled: false,
					error: typeof error === 'string' ? error : 'Oops, something went wrong.',
				});
			});
		}
	}

	login = () => {
		if (!this.state.disabled) {
			this.setState({
				disabled: true,
				error: null
			});

			if (this.state.mode === 'login') {
				session.login(this.user)
					.then(() => this.props.setMode('LOGGED_IN'))
					.catch(error => {
						console.log(error)
						this.setState({
							disabled: false,
							error: typeof error === 'string' ? error : 'Oops, something went wrong.',
						});
					});
			} else {
				session.register(this.user)
					.then(() => this.props.setMode('NEW_USER'))
					.catch(error => {
						this.setState({
							disabled: false,
							error: typeof error === 'string' ? error : 'Oops, something went wrong.',
						});
					});
			}
		}
	}

	toggle = () => {
		this.state.mode === 'login' ?
			this.setState({ mode: 'register' }) :
			this.setState({ mode: 'login' });
	}

	render() {
		return (
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
					<KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>

						<View style={{ flex: 2, justifyContent: 'flex-end' }}>
							<Text style={[styles.whiteText, { fontSize: 16, marginBottom: 10 }]}>
								It happens sometimes.
							</Text>
							<Text style={styles.whiteText}>
								{"Please enter your email\nand we'll send you a new password"}
							</Text>
						</View>

						{/* Form */}
						<View style={{ flex: 3, margin: 50 }}>
							{/* Email */}
							<TextInput
								autoCapitalize='none'
								autoCorrect={false}
								keyboardType='email-address'
								onChangeText={email => this.user.email = email}
								placeholder='Email'
								placeholderTextColor='rgb(200,200,200)'
								style={styles.input} />

							{
								this.state.error &&
								<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.error}</Text>
							}

							{/* Create Account */}
							<TouchableHighlight
								onPress={this.submit}
								style={[styles.button, { backgroundColor: constants.lime, marginTop: 15 }]}
								underlayColor='#31da5b'>
								<Text style={styles.buttonText}>Submit</Text>
							</TouchableHighlight>
						</View>

					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const mapStateToProps = state => ({
	mode: state.session
});

const mapDispatchToProps = dispatch => ({
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);