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

import session from '../../services/session.service';

import { colors } from '../../etc/constants';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: false,
			error: null,
			mode: 'register'
		};

		this.user = {
			email: '',
			password: ''
		};
	}


	facebookLogin = () => {
		if (!this.state.disabled) {
			this.setState({
				disbaled: true,
				error: null,
			});

			console.log("LoginManager", LoginManager);

			LoginManager.logInWithReadPermissions(['public_profile']).then(result => {
				if (result.isCancelled) this.setState({ disabled: false });
				else {
					const infoRequest = new GraphRequest('/me', null, (error, result) => {
						if (error) throw error.toString();
						else return session.facebookLogin({ id: result.id })
							.then(isNew => {
								if (isNew === true) this.props.setMode(3);
								else this.props.setMode(1);
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
					.then(() => this.props.setMode(1))
					.catch(error => {
						console.log(error)
						this.setState({
							disabled: false,
							error: typeof error === 'string' ? error : 'Oops, something went wrong.',
						});
					});
			} else {
				session.register(this.user)
					.then(() => this.props.setMode(3))
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
					<KeyboardAvoidingView
						behavior={'padding'}
						style={{ flex: 1 }}>

						{/* Buzzer */}
						<View style={{ flex: 2, justifyContent: 'flex-end' }}>
							<Text style={[styles.whiteText, { fontSize: 16 }]}>SETTINGS</Text>
							<Text style={styles.whiteText}>Sign into your account here:</Text>
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

							{/* Password */}
							<TextInput
								autoCapitalize='none'
								autoCorrect={false}
								onChangeText={password => this.user.password = password}
								placeholder='Password'
								placeholderTextColor='rgb(200,200,200)'
								secureTextEntry={true}
								style={styles.input} />

							<Text style={[styles.already, { textAlign: 'right' }]}>
								Forgot Password?
							</Text>

							{
								this.state.error &&
								<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.error}</Text>
							}

							{/* Create Account */}
							<TouchableHighlight
								onPress={this.login}
								style={styles.create}
								underlayColor='#31da5b'>
								<Text style={styles.buttonText}>
									{this.state.mode === 'register' ? 'Create Account' : 'Login'}
								</Text>
							</TouchableHighlight>

							<View style={{ alignItems: 'center', marginTop: 10 }}>
								<View style={{ flexDirection: 'row' }}>
									<Text style={styles.already}>
										{
											this.state.mode === 'register' ?
												'Aleady have an account? ' :
												'Don\'t have an account? '
										}
									</Text>
									<Text onPress={this.toggle} style={styles.sign}>
										{this.state.mode === 'register' ? 'Sign In' : 'Register'}
									</Text>
								</View>
							</View>

							{/* Facebook */}
							<TouchableHighlight
								onPress={this.facebookLogin}
								style={styles.facebook}
								underlayColor='#3b5998'>
								<Text style={styles.buttonText}>Continue with Facebook</Text>
							</TouchableHighlight>
						</View>

						<View style={{ flex: 1 }}>

						</View>
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	already: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 10,
		fontWeight: 'bold'
	},
	button: {
		height: 50,
		justifyContent: 'center',
		padding: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'
	},
	input: {
		backgroundColor: 'white',
		color: 'black',
		fontSize: 16,
		height: 50,
		marginBottom: 10,
		padding: 10
	},
	sign: {
		backgroundColor: 'transparent',
		color: colors.blue,
		fontSize: 10,
		fontWeight: 'bold'
	},
	whiteText: {
		backgroundColor: 'transparent',
		color: 'white',
		textAlign: 'center'
	},
});

const mapStateToProps = state => ({
	mode: state.session
});

const mapDispatchToProps = dispatch => ({
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);