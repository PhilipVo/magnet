import React, { Component } from 'react';
import { SegmentedControlIOS, StatusBar, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { TabsNavigator } from '../../../navigators/tabs.navigator';

import styles, { constants } from '../../../styles';

class Home extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<StatusBar barStyle='dark-content' />

				{/* Header */}
				<View style={styles.homeHeader}>
					<View style={styles.centeredView}>
						<Icon color={constants.darkGray} name='menu' onPress={this.props.mainToggle} size={40} />
					</View>
					<View style={{ flex: 3 }}>
						<SegmentedControlIOS
							values={['Qualified', 'Prospects']}
							selectedIndex={0}
							onValueChange={this.props.tabsToggle}
							style={{ flex: 1, marginVertical: 10 }}/>
					</View>
					<View style={styles.centeredView}>
						<Icon color={constants.darkGray} name='menu' size={40} />
					</View>
				</View>

				{/* Body */}
				<View style={{ backgroundColor: 'white', flex: 11 }}>
					{/* Search */}
					<TextInput
						autoCapitalize='none'
						autoCorrect={false}
						onChangeText={() => {}}
						placeholder='Search'
						placeholderTextColor={constants.lightGray}
						style={styles.searchInput} />
					<Icon
						color={constants.lightGray}
						name='search'
						size={18}
						style={{ position: 'absolute', left: 14, top: 17 }} />

					<TabsNavigator />
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
	mainToggle: () => dispatch({ type: 'MAIN_TOGGLE' }),
	tabsToggle: tab => dispatch({ type: `TABS_${tab.toUpperCase()}` })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);