import React, { Component } from 'react';
import {
	Image,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import http from '../../services/http.service';

import styles, { constants } from '../../styles';

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			birthday: null,
			enabled: false,
			first: '',
			gender: '',
			isVisible: false,
			last: '',
			path: ''
		};
	}

	render() {
		const valid = this.state.birthday && this.state.first && this.state.last &&
			this.state.gender && this.state.path ? true : false;

			return (
			<View style={{ flex: 1 }}>
				{/* Header */}
				<View style={{ flex: 1 }}>
					<Text style={[styles.whiteText, { fontSize: 50, marginTop: 20 }]}>U</Text>
				</View>

				{/* Body */}
				<View style={{ flex: 3 }}>
					<Text style={styles.whiteText}>Now, what's your body type?</Text>
				</View>

				{/* Footer */}
				<View style={{ flex: 1, justifyContent: 'flex-end' }}>
					<View style={{ flexDirection: 'row', height: 50 }}>
					<TouchableHighlight
							onPress={this.props.ftueBack}
							style={{ flex: 1 }}>
							<LinearGradient
								colors={[constants.lightGray, constants.darkGray]}
								style={styles.bottomButton}>
								<Text style={[styles.whiteText, { fontWeight: 'bold' }]}>Back</Text>
							</LinearGradient>
						</TouchableHighlight>
						<TouchableOpacity
							disabled={!valid}
							onPress={this.props.ftuePictures}
							style={{ flex: 1 }}>
							<LinearGradient
								colors={valid ? [constants.green, constants.darkGreen] :
									[constants.lightGray, constants.darkGray]}
								style={[styles.bottomButton, { backgroundColor: constants.green }]}>
								<Text style={[styles.whiteText, { fontWeight: 'bold' }]}>Next</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</View>

			</View>
		);
	}
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
	ftueBack: () => { dispatch({ type: 'FTUE_BACK' }); },
	ftueDrinks: () => { dispatch({ type: 'FTUE_DRINKS' }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);