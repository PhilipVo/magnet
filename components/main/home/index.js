import React, { Component } from 'react';
import {
	SegmentedControlIOS,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { TabsNavigator } from '../../../navigators/tabs.navigator';

import { colors } from '../../../etc/constants';

class Home extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<StatusBar barStyle='dark-content' />

				{/* Header */}
				<View style={styles.header}>
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon color={colors.darkGray} name='menu' onPress={this.props.mainToggle} size={40} />
					</View>
					<View style={{ flex: 3 }}>
						<SegmentedControlIOS
							values={['Qualified', 'Prospects']}
							selectedIndex={this.props.tab}
							onValueChange={this.props.tabsToggle}
							style={{ flex: 1, marginVertical: 10 }} />
					</View>
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon color={colors.darkGray} name='menu' size={40} />
					</View>
				</View>

				{/* Body */}
				<View style={{ backgroundColor: 'white', flex: 11 }}>
					{/* Search */}
					<TextInput
						autoCapitalize='none'
						autoCorrect={false}
						onChangeText={() => { }}
						placeholder='Search'
						placeholderTextColor={colors.lightGray}
						style={styles.searchInput} />
					<Icon
						color={colors.lightGray}
						name='search'
						size={18}
						style={{ position: 'absolute', left: 14, top: 17 }} />

					<TabsNavigator />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		backgroundColor: colors.lightGray,
		flex: 1,
		flexDirection: 'row',
		paddingTop: 10,
		justifyContent: 'space-around'
	},
	searchInput: {
		backgroundColor: colors.offWhite,
		borderRadius: 5,
		margin: 5,
		padding: 12,
		paddingLeft: 30,
	},
});

const mapStateToProps = state => ({
	tab: state.tabsNavigator.index
});

const mapDispatchToProps = dispatch => ({
	mainToggle: () => dispatch({ type: 'MAIN_TOGGLE' }),
	tabsToggle: tab => dispatch({ type: `TABS_${tab.toUpperCase()}` })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);