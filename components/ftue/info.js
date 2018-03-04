import React, { Component } from 'react';
import {
	Image,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	View
} from 'react-native';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-custom-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import http from '../../services/http.service';

import { colors } from '../../etc/constants';
import styles from '../../styles';

class Info extends Component {
	constructor(props) {
		super(props);
		this.state = {
			birthday: null,
			enabled: false,
			first: '',
			gender: '',
			isVisible: false,
			last: '',
			path: ''
		};
	}

	openCamera = () => {
		ImagePicker.openCamera({
			cropping: true,
			height: 100,
			mediaType: 'photo',
			useFrontCamera: true,
			width: 100
		}).then(image => this.setState({ path: image.path }))
			.catch(() => { });
	}

	openPicker = () => {
		ImagePicker.openPicker({
			cropperCircleOverlay: true,
			cropping: true,
			height: 100,
			width: 100,
		}).then(image => this.setState({ path: image.path }))
			.catch(() => { });
	}

	render() {
		const valid = this.state.birthday && this.state.first && this.state.last &&
			this.state.gender && this.state.path ? true : false;

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
						onPress={() => { this.actionSheetPicture.show() }}
						style={{ alignSelf: 'center', marginTop: 50 }}>
						{
							this.state.path ?
								<Image
									source={{ uri: this.state.path }}
									style={{ backgroundColor: 'white', borderRadius: 50, height: 100, width: 100 }} /> :
								<View style={{
									backgroundColor: 'rgba(255,255,255,0.5)',
									borderRadius: 50,
									borderColor: 'white',
									borderWidth: 2,
									height: 100,
									width: 100
								}} />
						}
					</TouchableHighlight>
					<Text style={[styles.whiteText, { fontSize: 10 }]}>Select a profile picture</Text>

					<View style={{ margin: 50 }}>
						{/* First Name */}
						<TextInput
							autoCorrect={false}
							onChangeText={first => this.setState({ first: first })}
							placeholder='First Name'
							placeholderTextColor='rgb(200,200,200)'
							style={styles.input} />

						{/* Last Name */}
						<TextInput
							autoCorrect={false}
							onChangeText={last => this.setState({ last: last })}
							placeholder='Last Name'
							placeholderTextColor='rgb(200,200,200)'
							style={styles.input} />

						<View style={{ flexDirection: 'row' }}>
							{/* Birthday */}
							<TouchableHighlight onPress={() => this.setState({ isVisible: true })} style={{ flex: 1 }}>
								<View style={[styles.inputView, { justifyContent: 'center' }]}>
									<Text style={{ color: this.state.birthday ? 'black' : 'rgb(200,200,200)', fontSize: 16 }}>
										{this.state.birthday ? moment(this.state.birthday).format('MMM D, YYYY') : 'Birthday'}
									</Text>
								</View>
							</TouchableHighlight>

							<View style={{ width: 10 }} />

							{/* Gender */}
							<TouchableHighlight onPress={() => this.actionSheetGender.show()} style={{ flex: 1 }}>
								<View style={[styles.inputView, { justifyContent: 'center' }]}>
									<Text style={{ color: this.state.gender ? 'black' : 'rgb(200,200,200)', fontSize: 16 }}>
										{this.state.gender || 'Gender'}
									</Text>
								</View>
							</TouchableHighlight>
						</View>

					</View>
				</View>

				{/* Footer */}
				<View style={{ flex: 1, justifyContent: 'flex-end' }}>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.bottomButton} />
						<TouchableOpacity
							disabled={!valid}
							onPress={this.props.ftuePictures}
							style={{ flex: 1 }}>
							<LinearGradient
								colors={valid ? [colors.green, colors.darkGreen] :
									[colors.lightGray, colors.darkGray]}
								style={[styles.bottomButton, { backgroundColor: colors.green }]}>
								<Text style={[styles.whiteText, { fontWeight: 'bold' }]}>Continue</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</View>

				{/* Birthday picker */}
				<DateTimePicker
					onCancel={() => this.setState({ isVisible: false })}
					onConfirm={birthday => this.setState({ birthday: birthday, isVisible: false })}
					isVisible={this.state.isVisible}
					maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 21))}
					titleIOS='What is your date of birth?' />

				{/* ActionSheet for gender */}
				<ActionSheet
					ref={ref => this.actionSheetGender = ref}
					title={'What is your gender?'}
					options={['Cancel', 'Male', 'Female']}
					cancelButtonIndex={0}
					onPress={index => {
						switch (index) {
							case 1:
								this.setState({ gender: 'Male' })
								break;
							case 2:
								this.setState({ gender: 'Female' })
								break;
							default:
						}
					}} />

				{/* ActionSheet for picture */}
				<ActionSheet
					ref={ref => this.actionSheetPicture = ref}
					title={'How would you like to set your profile picture?'}
					options={['Cancel', 'Use Photo Library', 'Use Camera']}
					cancelButtonIndex={0}
					onPress={index => {
						switch (index) {
							case 1:
								this.openPicker();
								break;
							case 2:
								this.openCamera();
								break;
							default:
						}
					}} />
			</View>
		);
	}
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
	ftuePictures: () => { dispatch({ type: 'FTUE_PICTURES' }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);