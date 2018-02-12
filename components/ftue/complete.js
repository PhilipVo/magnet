import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
	gametime: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 40,
		textAlign: 'center'
	},
	never: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
	}
});

class Complete extends Component {
	render() {
		return (
			<TouchableWithoutFeedback onPress={() => {
				this.props.setMode(1);
				this.props.ftueBack();
			}}>
				<View style={{ flex: 1 }}>

					{/* Buzzer */}
					<View style={{ flex: 1, justifyContent: 'flex-end' }}>
						<Text style={styles.gametime}>Buzzer</Text>
						<Text style={styles.never}>Outstanding!</Text>
					</View>

					{/* Icon */}
					<View style={{ alignItems: 'center', flex: 2, justifyContent: 'center' }}>
						<Image

							style={{ height: 90, width: 90 }} />
					</View>

					{/* Outstanding */}
					<View style={{ flex: 2 }}>
						<Text style={[styles.never, { paddingHorizontal: 40 }]}>
							We'll send you notifications of when your favorite teams are about to play.
							</Text>
					</View>

				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const mapStateToProps = state => ({
	mode: state.session
});

const mapDispatchToProps = dispatch => ({
	ftueBack: () => { dispatch({ type: 'FTUE_BACK' }); },
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Complete);