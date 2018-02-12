import React, { Component } from 'react';
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import http from '../../services/http.service';

const styles = StyleSheet.create({
	back: {
		alignItems: 'flex-start',
		flex: 1,
		height: 40,
		marginVertical: 10
	},
	gametime: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 40,
		textAlign: 'center'
	},
	lets: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
	},
	select: {
		alignItems: 'center',
		backgroundColor: 'rgba(49,218,91,0.4)',
		borderRadius: 5,
		flex: 1,
		flexDirection: 'row',
		height: 40,
		justifyContent: 'space-between'
	},
	sport: {
		color: 'white',
		fontSize: 18,
		textAlign: 'center'
	}
});

class Teams extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}

	componentDidMount() {
		const followed = http.get(`/api/followings/get-followed-teams-for-sport/${this.props.sport}`)
			.catch(error => { throw error });

		const unfollowed = http.get(`/api/teams/get-unfollowed-teams-for-sport/${this.props.sport}`)
			.catch(error => { throw error });

		Promise.all([followed, unfollowed])
			.then(data => this.setState({ data: data[0].concat(data[1]) }))
			.catch(() => { })
	}

	toggleFollowing = (item, index) => {
		if (item._team) http.post('/api/followings', JSON.stringify({
			sport: this.props.sport,
			team: item._team
		})).then(() => {
			const data = this.state.data.slice();
			data[index].team = item._team;
			delete data[index]._team;
			this.setState({ data: data });
		}).catch(() => { });
		else if (item.team) http.delete(`/api/followings/${this.props.sport}/${item.team}`)
			.then(() => {
				const data = this.state.data.slice();
				data[index]._team = item.team;
				delete data[index].team;
				this.setState({ data: data });
			}).catch(() => { });
	}

	render() {
		return (
			<View style={{ flex: 1, padding: 20 }}>

				{/* Header */}
				<View style={{ flex: 2 }}>
					<View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
						<Image

							style={{ height: 40, width: 40 }} />
						<Text style={styles.gametime}> Buzzer</Text>
					</View>
					<Text style={styles.lets}>
						{
							this.state.data.length === 1 ?
								`Select below to follow ${this.props.sport}` :
								`Select ${this.props.sport} teams to follow`
						}
					</Text>
				</View>


				{/* Body */}
				<View style={{ flex: 10 }}>
					<View style={{ flex: 9 }}>
						<FlatList
							data={this.state.data}
							keyExtractor={(item, index) => `${index}`}
							renderItem={({ item, index }) => (
								<TouchableHighlight
									onPress={() => this.toggleFollowing(item, index)}
									style={{ height: 40, marginVertical: 7 }}
									underlayColor='transparent'>
									<View style={styles.select}>
										<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
											<Icon color='white' name={item.team ? 'check-square-o' : 'square-o'} size={20} />
										</View>
										<View style={{ flex: 3 }} >
											<Text style={styles.sport}>{item.team ? item.team : item._team}</Text>
										</View>
										<View style={{ flex: 1 }} />
									</View>
								</TouchableHighlight>
							)} />
					</View>

					<View style={styles.back}>
						{/* Back */}
						<TouchableHighlight
							onPress={this.props.goBack}
							style={{ backgroundColor: '#31da5b', borderRadius: 5, padding: 10 }}
							underlayColor='#31da5b'>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon color='white' name='angle-left' size={20} />
								<Text style={styles.sport}> Save and go back</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>

			</View >
		);
	}
}

const mapStateToProps = (state, props) => ({
	sport: props.navigation.state.params.sport,
});

const mapDispatchToProps = dispatch => ({
	goBack: () => { dispatch({ type: 'FTUE_BACK' }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);