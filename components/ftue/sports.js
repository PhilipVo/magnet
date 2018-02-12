import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';

const styles = StyleSheet.create({
	finish: {
		alignItems: 'flex-end',
		flex: 1,
		height: 40,
		justifyContent: 'flex-end',
		marginVertical: 7
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

class Sports extends Component {
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
					<Text style={styles.lets}>Select the sports you follow</Text>
				</View>

				{/* Body */}
				<View style={{ flex: 10 }}>
					{/* Sports */}
					<View style={{ flex: 9 }}>
						{/* Baseball */}
						<TouchableHighlight
							onPress={() => this.props.ftueTeams('baseball')}
							style={{ height: 40, marginVertical: 7 }}
							underlayColor='transparent'>
							<View style={styles.select}>
								<View style={{ flex: 1 }} />
								<View style={{ flex: 2 }} >
									<Text style={styles.sport}>Baseball</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
						</TouchableHighlight>

						{/* Basketball */}
						<TouchableHighlight
							onPress={() => this.props.ftueTeams('basketball')}
							style={{ height: 40, marginVertical: 7 }}
							underlayColor='transparent'>
							<View style={styles.select}>
								<View style={{ flex: 1 }} />
								<View style={{ flex: 2 }} >
									<Text style={styles.sport}>Basketball</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
						</TouchableHighlight>

						{/* Football */}
						<TouchableHighlight
							onPress={() => this.props.ftueTeams('football')}
							style={{ height: 40, marginVertical: 7 }}
							underlayColor='transparent'>
							<View style={styles.select}>
								<View style={{ flex: 1 }} />
								<View style={{ flex: 2 }} >
									<Text style={styles.sport}>Football</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
						</TouchableHighlight>

						{/* Golf */}
						<TouchableHighlight
							onPress={() => this.props.ftueTeams('golf')}
							style={{ height: 40, marginVertical: 7 }}
							underlayColor='transparent'>
							<View style={styles.select}>
								<View style={{ flex: 1 }} />
								<View style={{ flex: 2 }} >
									<Text style={styles.sport}>Golf</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
						</TouchableHighlight>

						{/* Hockey */}
						<TouchableHighlight
							onPress={() => this.props.ftueTeams('hockey')}
							style={{ height: 40, marginVertical: 7 }}
							underlayColor='transparent'>
							<View style={styles.select}>
								<View style={{ flex: 1 }} />
								<View style={{ flex: 2 }} >
									<Text style={styles.sport}>Hockey</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
						</TouchableHighlight>

						{/* MMA */}
						<TouchableHighlight
							onPress={() => this.props.ftueTeams('mma')}
							style={{ height: 40, marginVertical: 7 }}
							underlayColor='transparent'>
							<View style={styles.select}>
								<View style={{ flex: 1 }} />
								<View style={{ flex: 2 }} >
									<Text style={styles.sport}>MMA</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
						</TouchableHighlight>

						{/* Nascar */}
						<TouchableHighlight
							onPress={() => this.props.ftueTeams('nascar')}
							style={{ height: 40, marginVertical: 7 }}
							underlayColor='transparent'>
							<View style={styles.select}>
								<View style={{ flex: 1 }} />
								<View style={{ flex: 2 }} >
									<Text style={styles.sport}>NASCAR</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
						</TouchableHighlight>

						{/* Soccer */}
						<TouchableHighlight
							onPress={() => this.props.ftueTeams('soccer')}
							style={{ height: 40, marginVertical: 7 }}
							underlayColor='transparent'>
							<View style={styles.select}>
								<View style={{ flex: 1 }} />
								<View style={{ flex: 2 }} >
									<Text style={styles.sport}>Soccer</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
						</TouchableHighlight>
					</View>

					{/* Finish */
						this.props.mode === 3 &&
						<View style={styles.finish}>
							<TouchableHighlight
								onPress={this.props.ftueComplete}
								style={{ backgroundColor: '#31da5b', borderRadius: 5, padding: 10 }}
								underlayColor='#31da5b'>
								<Text style={styles.sport}>Finish</Text>
							</TouchableHighlight>
						</View>
					}

				</View>
			</View >
		);
	}
}

const mapStateToProps = state => ({
	mode: state.mode,
});

const mapDispatchToProps = dispatch => ({
	ftueComplete: sport => { dispatch({ type: 'FTUE_COMPLETE' }); },
	ftueTeams: sport => { dispatch({ type: 'FTUE_TEAMS', params: { sport: sport } }); },
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sports);