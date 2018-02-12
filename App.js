import React, { Component } from 'react';
import {
	AsyncStorage,
	Dimensions,
	Image,
	StatusBar,
	StyleSheet,
	View
} from 'react-native';
import { connect } from 'react-redux';

import session from './services/session.service';

const styles = StyleSheet.create({
	background: {
		height: Dimensions.get('window').height,
		position: 'absolute',
		width: Dimensions.get('window').width
	}
});

class App extends Component {
	componentDidMount() {
		AsyncStorage.getItem('magnetToken')
			.then(magnetToken => {
				if (magnetToken) {
					session.setSession(magnetToken)
						.then(() => this.props.setMode(1))
						.catch(() => { });
				} else this.props.setMode(2);
			}).catch(() => { });
	}

	render() {
		let Navigator = null;
		if (this.props.mode === 1) {
			const TabsNavigator = require('./navigators/tabs.navigator').TabsNavigator;
			Navigator = <TabsNavigator />
		} else if (this.props.mode === 2) {
			const AppNavigator = require('./navigators/app.navigator').AppNavigator;
			Navigator = <AppNavigator />
		} else if (this.props.mode === 3) {
			const FTUENavigator = require('./navigators/ftue.navigator').FTUENavigator;
			Navigator = <FTUENavigator />
		}

		return (
			<View style={{ flex: 1 }}>
				{
					this.props.mode !== 1 &&
					<Image
						source={require('./assets/images/background0.png')}
						style={styles.background} />
				}
				<StatusBar barStyle='light-content' />
				{Navigator}
			</View>
		);
	}
}

const mapStateToProps = state => ({
	mode: state.mode
});

const mapDispatchToProps = dispatch => ({
	setMode: mode => dispatch({ type: 'SET_MODE', mode: mode })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);;