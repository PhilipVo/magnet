import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import http from '../../services/http.service';

import styles, { constants } from '../../styles';

class Info extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			enabled: false,
			isVisible: false,
			path: ''
		};

		this.user = {
			birthday: null,
			first: '',
			gender: '',
			last: ''
		};

		this.items = [{
			id: '92iijs7yta',
			name: 'Ondo',
		}, {
			id: 'a0s0a8ssbsd',
			name: 'Ogun',
		}, {
			id: '16hbajsabsd',
			name: 'Calabar',
		}, {
			id: 'nahs75a5sg',
			name: 'Lagos',
		}, {
			id: '667atsas',
			name: 'Maiduguri',
		}, {
			id: 'hsyasajs',
			name: 'Anambra',
		}, {
			id: 'djsjudksjd',
			name: 'Benue',
		}, {
			id: 'sdhyaysdj',
			name: 'Kaduna',
		}, {
			id: 'suudydjsjd',
			name: 'Abuja',
		}];
	}

	componentDidMount() { }

	openPicker = () => {
		ImagePicker.openPicker({
			cropperCircleOverlay: true,
			cropping: true,
			height: 100,
			width: 100,
		}).then(image => this.setState({path: image.path}))
			.catch(() => { });
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* Header */}
				<View style={{ flex: 1 }}>
					<Text style={[styles.whiteText, { fontSize: 50, marginTop: 20 }]}>U</Text>
				</View>

				{/* Body */}
				<View style={{ flex: 3 }}>
					<Text style={styles.whiteText}>Please provide the following information:</Text>

					<TouchableHighlight
						onPress={this.openPicker}
						style={{ alignSelf: 'center', marginTop: 50 }}>
						{
							this.state.path ?
							<Image
								source={{ uri: this.state.path }}
								style={{ backgroundColor: 'white', borderRadius: 50, height: 100, width: 100 }} /> :
							<View style={{ backgroundColor: 'white', borderRadius: 50, height: 100, width: 100 }} />
						}
					</TouchableHighlight>
					<Text style={[styles.whiteText, { fontSize: 10 }]}>Select a profile picture</Text>

					<View style={{ margin: 50 }}>
						{/* First Name */}
						<TextInput
							autoCorrect={false}
							onChangeText={first => this.user.first = first}
							placeholder='First Name'
							placeholderTextColor='rgb(200,200,200)'
							style={styles.input} />

						{/* Last Name */}
						<TextInput
							autoCorrect={false}
							onChangeText={last => this.user.last = last}
							placeholder='Last Name'
							placeholderTextColor='rgb(200,200,200)'
							style={styles.input} />

						<View style={{flexDirection: 'row'}}>
							{/* Birthday */}
							<TouchableHighlight onPress={() => this.setState({ isVisible: true })} style={{flex: 1}}>
								<View style={[styles.inputView, {justifyContent: 'center'}]}>
									<Text style={{ color: this.user.birthday ? 'black' : 'rgb(200,200,200)', fontSize: 16}}>
										{this.user.birthday ? moment(this.user.birthday).format('MMM D, YYYY') : 'Birthday'}
									</Text>
								</View>
							</TouchableHighlight>

							<View style={{width: 10}}/>

							{/* Gender */}
							<ModalDropdown
								// adjustFrame={style => {
								// 	return {
								// 		height: null,
								// 		left: style.left,
								// 		right: style.right,
								// 		top: style.top,
								// 		width: 50,
								// 	};
								// }}
								defaultValue='Gender'
								dropdownStyle={{ flex: 1, height: 100, width: '100%' }}
								options={['Male', 'Female']}
								onSelect={(index, value) => this.user.gender = value}
								style={{ backgroundColor: 'white', flex: 1, height: 50, justifyContent: 'center', padding: 10 }}
								textStyle={{ color: this.user.gender ? 'black' : 'rgb(200,200,200)', fontSize: 16 }}
							/>
						</View>
						
					</View>
				</View>

				{/* Footer */}
				<View style={{ flex: 1, justifyContent: 'flex-end' }}>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.bottomButton} />
						<TouchableHighlight
							onPress={() => this.props.appLogin('register')}
							style={{ flex: 1 }}>
							<LinearGradient
								colors={[constants.green, constants.darkGreen]}
								style={[styles.bottomButton, { backgroundColor: constants.green }]}>
								<Text style={styles.whiteText}>Continue</Text>
							</LinearGradient>
						</TouchableHighlight>
					</View>
				</View>

				{/* Birthday picker */}
				<DateTimePicker
					onCancel={() => this.setState({ isVisible: false })}
					onConfirm={birthday => {
						this.user.birthday = birthday;
						this.setState({ isVisible: false });
					}}
					isVisible={this.state.isVisible}
					maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 21))}
					titleIOS='What is your date of birth?'/>
			</View>
		);
	}
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
	goBack: () => { dispatch({ type: 'FTUE_BACK' }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);