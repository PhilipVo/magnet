import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { TabsNavigator } from '../../../navigators/tabs.navigator';

import { colors } from '../../../etc/constants';

class Photos extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>

				{/* Header */}
				<View style={styles.header}>
					<View style={styles.centeredView}>
						<Icon color={colors.lightGray} name='chevron-left' onPress={this.props.homeBack} size={40} />
					</View>
					<View style={{ flex: 3 }}>
						<Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Photos</Text>
					</View>
					<View style={{ flex: 1 }} />
				</View>

				{/* Body */}
				<View style={{ flex: 11, padding: 40, justifyContent: 'flex-end' }}>

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	centeredView: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	header: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10
	}
});

const mapStateToProps = (state, props) => ({
	id: props.navigation.state.params.id
});

const mapDispatchToProps = dispatch => ({
	homeBack: () => dispatch({ type: 'HOME_BACK' }),
	homeView: id => dispatch({ type: 'HOME_VIEW', params: { id: id } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);