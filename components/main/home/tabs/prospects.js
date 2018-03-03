import React, { Component } from 'react';
import {
	FlatList,
	Image,
	RefreshControl,
	Text,
	View
} from 'react-native';
import { connect } from 'react-redux';

import http from '../../../../services/http.service';

import styles from '../../../../styles';

class Prospects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					first: 'Tracy',
					message: 'Tracy matches your criteria, howerver you don\'t fully match. ' +
						'Feel free to reach out and spark the fire!'
				},
				{
					first: 'Tracy',
					message: 'Tracy matches your criteria, howerver you don\'t fully match. ' +
						'Feel free to reach out and spark the fire!'
				},
				{
					first: 'Tracy',
					message: 'Tracy matches your criteria, howerver you don\'t fully match. ' +
						'Feel free to reach out and spark the fire!'
				},
				{
					first: 'Tracy',
					message: 'Tracy matches your criteria, howerver you don\'t fully match. ' +
						'Feel free to reach out and spark the fire!'
				},
				{
					first: 'Tracy',
					message: 'Tracy matches your criteria, howerver you don\'t fully match. ' +
						'Feel free to reach out and spark the fire!'
				},
			],
			refreshing: false
		};
	}

	componentDidMount = () => {
			
	}

	onRefresh = () => {
		if (!this.state.refreshing) {
			this.setState({ refreshing: true });
			http.get('/api/games/get-my-games')
				.then(data => this.setState({ data: data, refreshing: false }))
				.catch(() => { });
		}
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={this.state.data}
					keyExtractor={(item, index) => `${index}`}
					refreshControl={
						<RefreshControl
							enabled={!this.state.refreshing}
							onRefresh={this.onRefresh}
							refreshing={this.state.refreshing}
							size={RefreshControl.SIZE.SMALL} />
					}
					renderItem={({ item }) => (
						<View style={{ flexDirection: 'row', margin: 10 }}>
							<View style={{ flex: 1, marginRight: 10 }}>
								<Image 
									source={{ uri: 'https://assets.wired.com/photos/w_1720/wp-content/uploads/2016/04/chat_bot-01.jpg' }}
									style={{ borderRadius: 35, height: 70, width: 70 }} />
							</View>
							
							<View style={{ flex: 4 }}>
								<Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.first}</Text>
								<Text style={{ fontSize: 11 }}>{item.message}</Text>
							</View>
						</View>
					)} />
			</View>
		);
	}
}

export default connect()(Prospects);