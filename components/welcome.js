import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../etc/constants';

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
								style={[styles.bottomButton, { backgroundColor: colors.blue }]}
								underlayColor={colors.blue}>
								<Text style={styles.whiteText}>Sign In</Text>
							</TouchableHighlight>
							<TouchableHighlight
								onPress={() => this.props.appLogin('register')}
								style={{ flex: 1 }}>
								<LinearGradient
									colors={[colors.lightGreen, colors.darkGreen]}
									style={[styles.bottomButton, { backgroundColor: colors.green }]}>
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

const styles = StyleSheet.create({
	bottomButton: {
		alignItems: 'center',
		flex: 1,
		height: 50,
		justifyContent: 'center'
	},
	whiteText: {
		backgroundColor: 'transparent',
		color: 'white',
		textAlign: 'center'
	},
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	appLogin: mode => dispatch({ type: 'APP_LOGIN', params: { mode: mode } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);