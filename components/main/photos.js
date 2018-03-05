import React, { Component } from 'react';
import {
	View
} from 'react-native';
import { connect } from 'react-redux';

import session from '../../services/session.service';

import { colors } from '../../etc/constants';

class Photos extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}


	render() {
		return (
			<View>

			</View>
		);
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);