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

const styles = StyleSheet.create({
	already: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 10,
		fontWeight: 'bold'
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'
	},
	create: {
		backgroundColor: '#31da5b',
		borderRadius: 3,
		height: 35,
		justifyContent: 'center',
		marginTop: 15,
		padding: 5,
	},
	facebook: {
		backgroundColor: '#3b5998',
		borderRadius: 3,
		height: 35,
		justifyContent: 'center',
		padding: 5,
	},
	gametime: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 40,
		textAlign: 'center'
	},
	input: {
		backgroundColor: 'rgba(150,150,150,0.6)',
		borderColor: '#31da5b',
		borderRadius: 3,
		borderWidth: 0.5,
		color: 'white',
		fontSize: 16,
		height: 35,
		marginBottom: 10,
		padding: 5,
		textAlign: 'center'
	},
	never: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
	},
	or: {
		backgroundColor: 'transparent',
		color: 'white',
		fontWeight: 'bold'
	},
	orDivider: {
		backgroundColor: 'white',
		height: 0.5,
		width: 100
	},
	orView: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 15
	},
	sign: {
		backgroundColor: 'transparent',
		color: '#31da5b',
		fontSize: 10,
		fontWeight: 'bold'
	},
});

class Login extends Component {
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
						<View style={{ flex: 1, justifyContent: 'flex-end' }}>
							<Text style={styles.gametime}>Buzzer</Text>
							<Text style={styles.never}>Never miss your favorite team play</Text>
						</View>

						{/* Icon */}
						<View style={{ alignItems: 'center', flex: 2, justifyContent: 'center' }}>
							<Image
								style={{ height: 90, width: 90 }} />
						</View>

						{/* Form */}
						<View style={{ flex: 2 }}>
							<View style={{ paddingHorizontal: 40 }}>

								{/* Email */}
								<TextInput
									autoCapitalize='none'
									autoCorrect={false}
									keyboardType='email-address'
									onChangeText={email => this.user.email = email}
									placeholder='email'
									placeholderTextColor='rgb(200,200,200)'
									style={styles.input} />

								{/* Password */}
								<TextInput
									autoCapitalize='none'
									autoCorrect={false}
									onChangeText={password => this.user.password = password}
									placeholder='password'
									placeholderTextColor='rgb(200,200,200)'
									secureTextEntry={true}
									style={styles.input} />

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
										<Text style={styles.already}> | </Text>
										<Text style={styles.sign}>Forgot Password?</Text>
									</View>
								</View>

								{/* Or */}
								<View style={styles.orView}>
									<View style={styles.orDivider} />
									<Text style={styles.or}>   or   </Text>
									<View style={styles.orDivider} />
								</View>

								{/* Facebook */}
								<TouchableHighlight
									onPress={this.facebookLogin}
									style={styles.facebook}
									underlayColor='#3b5998'>
									<Text style={styles.buttonText}>Continue with Facebook</Text>
								</TouchableHighlight>
							</View>
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