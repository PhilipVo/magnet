import React, { Component } from 'react';
import {
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import { connect } from 'react-redux';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { TabsNavigator } from '../../../navigators/tabs.navigator';

import { colors } from '../../../etc/constants';

class Home extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* Header */}
				<View style={styles.header}>
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon color={colors.darkGray} name='menu' onPress={this.props.mainToggle} size={40} />
					</View>
					<View style={{ flex: 3 }}>
						<SegmentedControlTab
							activeTabStyle={{ backgroundColor: colors.blue }}
							onTabPress={this.props.tabsToggle}
							selectedIndex={this.props.tab}
							tabTextStyle={{ color: colors.blue }}
							tabStyle={{ backgroundColor: 'transparent', borderColor: colors.blue }}
							values={['Qualified', 'Prospects']} />
					</View>
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon color={colors.darkGray} name='wifi' size={40} />
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
	tabsToggle: tab => dispatch({ type: `TABS_${tab ? 'PROSPECTS' : 'QUALIFIED'}` })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);