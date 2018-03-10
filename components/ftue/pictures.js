import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import moment from 'moment';

import http from '../../services/http.service';

import { colors } from '../../etc/constants';

const options = ['Cancel', 'Male', 'Female'];

class Pictures extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: []
		};
	}

	openPicker = () => {
		ImagePicker.openPicker({
			maxFiles: 6,
			mediaType: 'photo',
			multiple: true
		}).then(images => {
			console.log(images);
			this.setState({ images: images });
		}).catch(() => { });
	}

	render() {
		const valid = this.state.birthday && this.state.first && this.state.last &&
			this.state.gender && this.state.path ? true : false;

		return (
			<View style={{ flex: 1 }}>
				{/* Header */}
				<View style={{ alignItems: 'center', flex: 1 }}>
					<Text style={{ color: 'white', fontSize: 50, marginTop: 20 }}>U</Text>
				</View>

				{/* Body */}
				<View style={{ flex: 4 }}>
					<TouchableHighlight
						onPress={this.openPicker}
						style={{ flex: 2 }}>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							{
								this.state.images.length > 0 &&
								<View style={[styles.row, { alignItems: this.state.images.length > 3 ? 'flex-end' : 'center' }]}>
									{
										this.state.images[0] && <Image
											source={{ uri: this.state.images[0].path }}
											style={{ height: 120, width: 120 }} />
									}
									{
										this.state.images[1] && <Image
											source={{ uri: this.state.images[1].path }}
											style={{ height: 120, width: 120 }} />
									}
									{
										this.state.images[2] && <Image
											source={{ uri: this.state.images[2].path }}
											style={{ height: 120, width: 120 }} />
									}
								</View>
							}

							{
								this.state.images.length > 3 &&
								<View style={[styles.row, { alignItems: 'flex-start', marginTop: 5 }]}>
									{
										this.state.images[3] && <Image
											source={{ uri: this.state.images[3].path }}
											style={{ height: 120, width: 120 }} />
									}
									{
										this.state.images[4] && <Image
											source={{ uri: this.state.images[4].path }}
											style={{ height: 120, width: 120 }} />
									}
									{
										this.state.images[5] && <Image
											source={{ uri: this.state.images[5].path }}
											style={{ height: 120, width: 120 }} />
									}
								</View>
							}

							{
								this.state.images.length == 0 &&
								<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
									<Icon color='white' name='picture' size={100} />
								</View>
							}
						</View>
					</TouchableHighlight>

					<View style={{ flex: 1, justifyContent: 'center' }}>
						<Text style={{ color: 'white', textAlign: 'center' }}>
							{
								"Let's add more pictures\n\n" +
								"Only people you match with\n" +
								"will be able to see your photos.\n\n"
							}
						</Text>
						<Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
							{'Please note:\nYou may only upload up to 6 photos.'}
						</Text>
					</View>
				</View>

				{/* Footer */}
				<View style={{ flex: 1, justifyContent: 'flex-end' }}>
					<View style={{ flexDirection: 'row', height: 50 }}>
						<TouchableHighlight
							onPress={this.props.ftueBack}
							style={{ flex: 1 }}>
							<LinearGradient
								colors={[colors.lightGray, colors.darkGray]}
								style={styles.bottomButton}>
								<Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Back</Text>
							</LinearGradient>
						</TouchableHighlight>
						<TouchableHighlight
							onPress={() => this.props.setMode('LOGGED_IN')}
							style={{ flex: 1 }}>
							<LinearGradient
								colors={[colors.lightGreen, colors.darkGreen]}
								style={styles.bottomButton}>
								<Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Next</Text>
							</LinearGradient>
						</TouchableHighlight>
					</View>
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	bottomButton: {
		alignItems: 'center',
		flex: 1,
		height: 50,
		justifyContent: 'center'
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
});

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
	ftueBack: () => { dispatch({ type: 'FTUE_BACK' }); },
	ftueBody: () => { dispatch({ type: 'FTUE_BODY' }); },
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pictures);