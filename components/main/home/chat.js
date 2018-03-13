import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet';
import {
	Actions,
	Bubble,
	GiftedChat,
	InputToolbar,
	MessageText,
	Time
} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { colors } from '../../../etc/constants';
import CustomActions from '../../../etc/custom-actions';
import CustomComposer from '../../../etc/custom-composer';

const options = [
	'Cancel',
	'View Profile',
	'Video Call',
	'Voice Call',
	'Unmatch',
	{
		component: <Text style={{ color: 'red', fontSize: 20 }}>Report User</Text>,
		height: 58
	},
	{
		component: <Text style={{ color: 'red', fontSize: 20 }}>Block User</Text>,
		height: 58
	},
];

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};
	}

	componentDidMount() {
		this.setState({
			messages: [
				{
					_id: 1,
					text: 'Hello developer',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'React Native',
						avatar: 'https://vignette.wikia.nocookie.net/smallville/images/1/13/Gal_Gadot.jpg/revision/latest?cb=20170115102329',
					},
				},
				{
					_id: 2,
					text: 'How are you',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'React Native',
						avatar: 'https://vignette.wikia.nocookie.net/smallville/images/1/13/Gal_Gadot.jpg/revision/latest?cb=20170115102329',
					},
				},
				{
					_id: 3,
					text: 'Good, you? :)',
					createdAt: new Date(),
					user: {
						_id: 1,
						name: 'Elliot',
						avatar: 'https://media.tmz.com/2017/08/16/081617-chris-brown-primary-1.jpg',
					},
				},
				{
					_id: 4,
					text: 'Not bad :)',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'React Native',
						avatar: 'https://vignette.wikia.nocookie.net/smallville/images/1/13/Gal_Gadot.jpg/revision/latest?cb=20170115102329',
					},
				},
			],
		});
	}

	handleAction = index => {
		console.log('ind', index)
		switch (index) {
			case 1: // View Profile
				this.props.homeProfile(this.props.first);
				break;
			case 2: // Video Call

				break;
			case 3: // Voice Call

				break;
			case 4: // Unmatch

				break;
			case 5: // Report User

				break;
			case 6: // Block User

				break;
			default:
		}
	}

	onSend = (messages = []) => {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}));
	}

	renderBubble = props => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					left: {
						backgroundColor: 'white',
						shadowColor: colors.lightGray,
						shadowOffset: { height: 1, width: 1 },
						shadowOpacity: 1
					},
					right: {
						backgroundColor: colors.offWhite,
						shadowColor: 'gray',
						shadowOffset: { height: 1, width: 1 },
						shadowOpacity: 1
					},
				}}
			/>
		);
	}

	renderCustomActions = props => {
		if (Platform.OS === 'ios')
			return <CustomActions {...props} />

		const options = {
			'Action 1': (props) => {
				alert('option 1');
			},
			'Action 2': (props) => {
				alert('option 2');
			},
			'Cancel': () => { },
		};
		return <Actions {...props} options={options} />
	}

	renderCustomComposer = props => {
		return <CustomComposer {...props} />
	}

	renderInputToolbar = props => {
		return (
			<InputToolbar
				{...props}
				containerStyle={{
					borderTopColor: 'transparent',
					bottom: 4
				}}
			/>
		);
	}

	renderMessageText = props => {
		return (
			<MessageText
				{...props}
				textStyle={{
					left: { fontSize: 16 },
					right: { color: 'black', fontSize: 16 }
				}}
			/>
		);
	}

	renderTime = props => {
		return <Time {...props} textStyle={{ right: { color: '#aaa' } }} />
	}

	render() {
		return (
			<View style={{ backgroundColor: 'white', flex: 1 }}>
				{/* Header */}
				<View style={styles.header}>
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon
							color={colors.lightGray}
							name='chevron-left'
							onPress={this.props.homeBack}
							size={40} />
					</View>

					<View style={{ flex: 3 }}>
						<Text style={{ color: colors.darkGray, fontWeight: 'bold', textAlign: 'center' }}>
							{this.props.first}
						</Text>
					</View>

					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon
							color={colors.lightGray}
							name='info-outline'
							onPress={() => this.actionSheet.show()}
							size={25} />
					</View>
				</View>

				{/* Body */}
				<View style={{ flex: 11 }}>
					<GiftedChat
						messages={this.state.messages}
						onPressAvatar={user => this.props.homeProfile(user._id)}
						onSend={this.onSend}
						renderActions={this.renderCustomActions}
						renderBubble={this.renderBubble}
						renderComposer={this.renderCustomComposer}
						renderInputToolbar={this.renderInputToolbar}
						renderMessageText={this.renderMessageText}
						renderSend={() => { }}
						renderTime={this.renderTime}
						showUserAvatar={true}
						user={{
							_id: 1,
							avatar: 'https://media.tmz.com/2017/08/16/081617-chris-brown-primary-1.jpg',
							name: 'Elliot'
						}} />
				</View>

				<ActionSheet
					cancelButtonIndex={0}
					onPress={this.handleAction}
					options={options}
					ref={ref => this.actionSheet = ref}
					title={'What would you like to do'} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		backgroundColor: 'transparent',
		flex: 1,
		flexDirection: 'row',
		paddingTop: 10,
		justifyContent: 'space-around'
	},
});

const mapStateToProps = (state, props) => ({
	first: props.navigation.state.params.first
});

const mapDispatchToProps = dispatch => ({
	homeBack: () => dispatch({ type: 'HOME_BACK' }),
	homeProfile: id => dispatch({ type: 'HOME_PROFILE', params: { id: id } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);