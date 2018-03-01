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

import styles from './styles';

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

	render() {
		let Navigator = null;
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