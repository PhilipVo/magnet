import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import styles, { constants } from '../styles';

class Welcome extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 2 }}>
				</View>

				<View style={{ flex: 3 }}>
					<Text style={[styles.whiteText, { fontSize: 30, marginBottom: 70 }]}>
						Welcome to Magnet
					</Text>

					<Text style={[styles.whiteText, { fontSize: 15 }]}>
						{"Magnet matches you with\npeople around you based\non your preferences.\n\n" +
							"Let's get started!"}
					</Text>

					<View style={{ flex: 1, justifyContent: 'flex-end' }}>
						<View style={{ flexDirection: 'row' }}>
							<TouchableHighlight
								onPress={() => this.props.appLogin('login')}
								style={[styles.bottomButton, { backgroundColor: constants.blue }]}
								underlayColor={constants.blue}>
								<Text style={styles.whiteText}>Sign In</Text>
							</TouchableHighlight>
							<TouchableHighlight
								onPress={() => this.props.appLogin('register')}
								style={{ flex: 1 }}>
								<LinearGradient
									colors={[constants.green, constants.darkGreen]}
									style={[styles.bottomButton, { backgroundColor: constants.green }]}>
									<Text style={styles.whiteText}>Sign Up</Text>
								</LinearGradient>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	appLogin: mode => dispatch({ type: 'APP_LOGIN', params: { mode: mode } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);