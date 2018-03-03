import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import Actions from 'react-native-gifted-chat/src/Actions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import styles, { constants } from '../../../styles';

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};
	}

	componentWillMount() {
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

	onLoadEarlier() {
		setTimeout(() => {}, 2000);
	}

	onPressActionButton() {
		console.log('pressed')
	}

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
	}
	
	renderActions(props) {
		return <Actions
			{...props}
			icon={() => {return <Icon name='add-a-photo' size={30} />;}} />
	}

	render() {
		return (
			<View style={{ backgroundColor: 'white', flex: 1 }}>
				{/* Header */}
				<View style={[styles.homeHeader, { backgroundColor: 'transparent' }]}>
					<View style={styles.centeredView}>
						<Icon color={constants.lightGray} name='chevron-left' onPress={this.props.homeBack} size={40} />
					</View>

					<View style={{ flex: 3 }}>
						<Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.props.first}</Text>
					</View>

					<View style={styles.centeredView}>
						<Icon color={constants.lightGray} name='info-outline' size={25} />
					</View>
				</View>

				{/* Body */}
				<View style={{ flex: 11 }}>
					<GiftedChat
						loadEarlier={true}
						onLoadEarlier={this.onLoadEarlier}
						messages={this.state.messages}
						onPressActionButton={this.onPressActionButton}
						onPressAvatar={user => this.props.homeProfile(user._id)}
						onSend={messages => this.onSend(messages)}
						renderActions={this.renderActions}
						renderAvatarOnTop={true}
						showAvatarForEveryMessage={true}
						showUserAvatar={true}
						user={{
							_id: 1,
							avatar: 'https://media.tmz.com/2017/08/16/081617-chris-brown-primary-1.jpg',
							name: 'Elliot'
						}} />
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state, props) => ({
	first: props.navigation.state.params.first
});

const mapDispatchToProps = dispatch => ({
	homeBack: () => dispatch({ type: 'HOME_BACK' }),
	homeProfile: id => dispatch({ type: 'HOME_PROFILE', params: { id: id } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);