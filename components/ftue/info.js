import React, { Component } from 'react';
import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	TouchableWithoutFeedback,
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

class Info extends Component {
	constructor(props) {
		super(props);
		this.state = {
			birthday: null,
			enabled: false,
			first: '',
			gender: '',
			isVisible: false,
			keyboard: false,
			last: '',
			path: '',
		};
	}

	componentWillMount() {
		this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',
			() => this.setState({ keyboard: true }));
		this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',
			() => this.setState({ keyboard: false }));
	}

	componentWillUnmount() {
		this.keyboardWillShowListener.remove();
		this.keyboardWillHideListener.remove();
	}

	openCamera = () => {
		ImagePicker.openCamera({
			cropperCircleOverlay: true,
			cropping: true,
			mediaType: 'photo',
			useFrontCamera: true
		}).then(image => this.setState({ path: image.path }))
			.catch(() => { });
	}

	openPicker = () => {
		ImagePicker.openPicker({
			cropperCircleOverlay: true,
			cropping: true
		}).then(image => this.setState({ path: image.path }))
			.catch(() => { });
	}

	render() {
		const valid = this.state.birthday && this.state.first && this.state.last &&
			this.state.gender && this.state.path ? true : false;

		return (
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
					<KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>

						{/* Header */}
						<View style={{ flex: 1 }}>
							<Text style={[styles.whiteText, { fontSize: 50, marginTop: 20 }]}>U</Text>
						</View>

						{/* Body */}
						<View style={{ alignItems: 'center', flex: 4, margin: 50 }}>
							<Text style={styles.whiteText}>Please provide the following information:</Text>

							<TouchableHighlight
								onPress={() => { this.actionSheetPicture.show() }}
								style={{ marginTop: 20 }}>
								{
									this.state.path ?
										<Image
											source={{ uri: this.state.path }}
											style={{ backgroundColor: 'white', borderRadius: 75, height: 150, resizeMode: 'cover', width: 150 }} /> :
										<View style={{
											backgroundColor: 'rgba(255,255,255,0.5)',
											borderRadius: 75,
											borderColor: 'white',
											borderWidth: 2,
											height: 150,
											width: 150
										}} />
								}
							</TouchableHighlight>

							<Text style={{ color: 'white', fontSize: 12, marginBottom: 20 }}>
								Select a profile picture
							</Text>

							{/* First Name */}
							<View style={{ flexDirection: 'row', marginVertical: 5 }}>
								<View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
									<TextInput
										autoCorrect={false}
										onChangeText={value => this.setState({ first: value })}
										placeholder='First Name'
										placeholderTextColor={colors.lightGray}
										style={{ color: colors.darkGray, fontWeight: this.state.first ? 'bold' : 'normal' }} />
								</View>
							</View>

							{/* Last Name */}
							<View style={{ flexDirection: 'row', marginVertical: 5 }}>
								<View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
									<TextInput
										autoCorrect={false}
										onChangeText={value => this.setState({ last: value })}
										placeholder='Last Name'
										placeholderTextColor={colors.lightGray}
										style={{ color: colors.darkGray, fontWeight: this.state.last ? 'bold' : 'normal' }} />
								</View>
							</View>

							<View style={{ flexDirection: 'row', marginVertical: 5 }}>
								{/* Birthday */}
								<TouchableHighlight
									onPress={() => this.setState({ isVisible: true })}
									style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', marginRight: 10, padding: 10 }}>
									<Text
										style={{
											color: this.state.birthday ? colors.darkGray : colors.lightGray,
											fontWeight: this.state.birthday ? 'bold' : 'normal'
										}}>
										{this.state.birthday ? moment(this.state.birthday).format('MMM D, YYYY') : 'Birthday'}
									</Text>
								</TouchableHighlight>

								{/* Gender */}
								<TouchableHighlight
									onPress={() => this.actionSheetGender.show()}
									style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', padding: 10 }}>
									<Text
										style={{
											color: this.state.gender ? colors.darkGray : colors.lightGray,
											fontWeight: this.state.gender ? 'bold' : 'normal'
										}}>
										{this.state.gender || 'Gender'}
									</Text>
								</TouchableHighlight>
							</View>

						</View>

						{/* Footer */}
						<View style={{ flex: 1, justifyContent: 'flex-end' }}>
							{
								!this.state.keyboard &&
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
							}
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
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
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
	input: {
		backgroundColor: 'white',
		color: 'black',
		fontSize: 16,
		height: 50,
		marginBottom: 10,
		padding: 10
	},
	inputView: {
		backgroundColor: 'white',
		height: 50,
		justifyContent: 'center',
		marginBottom: 10,
		padding: 10
	},
	whiteText: {
		backgroundColor: 'transparent',
		color: 'white',
		textAlign: 'center'
	},
});

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
	ftuePictures: () => { dispatch({ type: 'FTUE_PICTURES' }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);