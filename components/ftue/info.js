import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import http from '../../services/http.service';

import styles, { constants } from '../../styles';

class Info extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() { }

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<Text style={[styles.whiteText, { fontSize: 50, marginTop: 20 }]}>U</Text>
				</View>

				<View style={{ flex: 3 }}>

				</View>

				<View style={{ flex: 1, justifyContent: 'flex-end' }}>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.bottomButton}/>
						<TouchableHighlight
							onPress={() => this.props.appLogin('register')}
							style={{ flex: 1 }}>
							<LinearGradient
								colors={[constants.green, constants.darkGreen]}
								style={[styles.bottomButton, { backgroundColor: constants.green }]}>
								<Text style={styles.whiteText}>Continue</Text>
							</LinearGradient>
								</TouchableHighlight>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
	goBack: () => { dispatch({ type: 'FTUE_BACK' }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);