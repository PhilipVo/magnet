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

import geolocation from './services/geolocation.service';
import session from './services/session.service';

class App extends Component {
	componentDidMount() {
		AsyncStorage.getItem('magnetToken')
			.then(magnetToken => {
				if (magnetToken) {
					session.setSession(magnetToken)
						.then(() => this.props.setMode('LOGGED_IN'))
						.catch(() => { });
				} else this.props.setMode('LOGGED_OUT');
			}).catch(() => { });
	}

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	console.log('nextProps', nextProps.mode);
	// }

	render() {
		// let Navigator = null;
		// if (this.props.mode === 'LOGGED_IN') {
		// 	const MainNavigator = require('./navigators/main.navigator').MainNavigator;
		// 	Navigator = <MainNavigator />
		// } else if (this.props.mode === 'LOGGED_OUT') {
		// 	const AppNavigator = require('./navigators/app.navigator').AppNavigator;
		// 	Navigator = <AppNavigator />
		// } else if (this.props.mode === 'NEW_USER') {
		const FTUENavigator = require('./navigators/ftue.navigator').FTUENavigator;
		Navigator = <FTUENavigator />
		// }

		return (
			<View style={{ flex: 1 }}>
				{
					this.props.mode !== 'LOGGED_IN' &&
					<Image
						style={styles.background} />
				}
				{
					this.props.mode !== 'LOGGED_IN' &&
					<StatusBar barStyle='light-content' />
				}
				{Navigator}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		height: Dimensions.get('window').height,
		position: 'absolute',
		width: Dimensions.get('window').width
	}
});

const mapStateToProps = state => ({
	mode: state.mode
});

const mapDispatchToProps = dispatch => ({
	setMode: mode => dispatch({ type: 'SET_MODE', mode: mode })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);;