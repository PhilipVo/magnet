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
import LinearGradient from 'react-native-linear-gradient';

import session from '../services/session.service';

import { colors } from '../etc/constants';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: false,
			email: '',
			error: null,
			mode: this.props.mode,
			password: ''
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

		// if (!this.state.disabled) {
		// 	this.setState({
		// 		disabled: true,
		// 		error: null
		// 	});

		if (this.state.mode === 'login') {
			this.props.setMode('LOGGED_IN');
			// 		session.login(this.user)
			// 			.then(() => this.props.setMode('LOGGED_IN'))
			// 			.catch(error => {
			// 				this.setState({
			// 					disabled: false,
			// 					error: typeof error === 'string' ? error : 'Oops, something went wrong.',
			// 				});
			// 			});
		} else {
			this.props.setMode('NEW_USER');
			// 		session.register(this.user)
			// 			.then(() => this.props.setMode('NEW_USER'))
			// 			.catch(error => {
			// 				this.setState({
			// 					disabled: false,
			// 					error: typeof error === 'string' ? error : 'Oops, something went wrong.',
			// 				});
			// 			});
		}
		// }
	}

	toggle = () => {
		this.state.mode === 'login' ?
			this.setState({ mode: 'register' }) :
			this.setState({ mode: 'login' });
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
					<KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>

						<View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
							<Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>
								{this.state.mode === 'register' ? 'Welcome to Magnet' : 'Welcome Back'}
							</Text>
							<Text style={{ color: 'white', textAlign: 'center' }}>
								{
									this.state.mode === 'register' ?
										'Please provide the following information:' :
										'Sign into your account here:'
								}
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

							{/* Password */}
							<View style={{ flexDirection: 'row', marginVertical: 5 }}>
								<View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
									<TextInput
										autoCapitalize='none'
										autoCorrect={false}
										onChangeText={value => this.setState({ password: value })}
										placeholder='Password'
										placeholderTextColor={colors.lightGray}
										style={{ color: colors.darkGray, fontWeight: 'bold' }}
										secureTextEntry={true} />
								</View>
							</View>

							{
								this.state.mode === 'login' &&
								<Text
									onPress={this.props.forgot}
									style={styles.forgot}>
									Forgot Password?
								</Text>
							}

							{/* Login/Register */}
							<TouchableHighlight
								onPress={this.login}
								style={{ flexDirection: 'row', marginBottom: 5, marginTop: 20 }}>
								<LinearGradient
									colors={[colors.lightGreen, colors.darkGreen]}
									style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
									<Text style={{ color: 'white', flex: 1, fontWeight: 'bold', textAlign: 'center' }}>
										{this.state.mode === 'register' ? 'Create Account' : 'Login'}
									</Text>
								</LinearGradient>
							</TouchableHighlight>

							{
								this.state.error &&
								<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.error}</Text>
							}

							<View style={{ flexDirection: 'row' }}>
								<Text
									onPress={this.toggle}
									style={{ color: 'white', fontSize: 12, fontWeight: 'bold', paddingVertical: 5 }}>
									{
										this.state.mode === 'register' ?
											'Aleady have an account? ' :
											'Don\'t have an account? '
									}
								</Text>
								<Text
									onPress={this.toggle}
									style={{ color: colors.blue, fontSize: 12, fontWeight: 'bold', paddingVertical: 5 }}>
									{this.state.mode === 'register' ? 'Sign In' : 'Sign up now'}
								</Text>
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
								style={{ backgroundColor: '#3b5998', flexDirection: 'row', marginVertical: 5, padding: 10 }}>
								<Text style={{ color: 'white', flex: 1, fontWeight: 'bold', textAlign: 'center' }}>
									Continue with Facebook
								</Text>
							</TouchableHighlight>

						</View>
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	forgot: {
		alignSelf: 'flex-end',
		color: 'white',
		fontSize: 12,
		fontWeight: 'bold',
		padding: 10
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
	}
});

const mapStateToProps = (state, props) => ({
	mode: props.navigation.state.params.mode
});

const mapDispatchToProps = dispatch => ({
	forgot: () => dispatch({ type: 'APP_FORGOT' }),
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);