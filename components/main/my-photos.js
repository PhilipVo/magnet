import React, { Component } from 'react';
import {
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-custom-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { colors } from '../../etc/constants';

class MyPhotos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			selected: false,
			showsButtons: false,
			visible: false
		};
	}

	componentDidMount() {
		this.setState({
			data: [
				'https://pbs.twimg.com/profile_images/949595715189161989/6b6AnIX4_400x400.jpg',
				'https://s1.ticketm.net/tm/en-us/dam/a/93a/cb47af7d-546f-403c-848a-8edf54ff193a_296481_CUSTOM.jpg',
				'https://www.billboard.com/files/media/chris-brown-5-live-2017-billboard-1548.jpg',
				'https://www.bet.com/style/beauty/2017/11/10/see-chris-brown_s-drastic-hair-transformations-over-the-years/_jcr_content/mainCol/imagegallerycontainer/galleryimage_19.custom1540fx865fx0xcrop.dimg/__1510264502668__1510261427758/110917-Style-Chris-Brown-Drastic-Hair-Transformation-11.jpg',
				'https://img.wennermedia.com/featured-promo-724/chris-brown-rihanna-assault-documentary-34883578-5e96-408b-84a9-b33039411237.jpg',
				'https://i2-prod.mirror.co.uk/incoming/article7284514.ece/ALTERNATES/s615/Nia-Guzman-Chris-Borwn-Main.jpg',
			]
		});
	}

	generateImages = () => {
		const images = [];
		for (let i = 0; i < this.state.data.length; i++) {
			images.push(
				<TouchableWithoutFeedback
					key={i}
					onPress={() => {
						this.setState({ showsButtons: !this.state.showsButtons })
					}}
					style={{ flex: 1 }}
					underlayColor='transparent'>
					<Image source={{ uri: this.state.data[i] }} style={{ flex: 1 }} />
				</TouchableWithoutFeedback>
			);
		}

		return images;
	}

	generateRows = () => {
		const rows = [];
		for (let i = 0; i < 3; i++) {
			rows.push(
				<View key={i} style={{ flex: 1, flexDirection: 'row' }}>
					{
						this.state.data[2 * i] &&
						<TouchableWithoutFeedback
							onPress={() => {
								this.setState(() => {
									return { selected: 2 * i }
								}, () => this.actionSheet.show());
							}}
							style={{ flex: 1 }}>
							<Image source={{ uri: this.state.data[2 * i] }} style={{ flex: 1, borderRadius: 5, margin: 5 }} />
						</TouchableWithoutFeedback>
					}
					{
						this.state.data[2 * i + 1] &&
						<TouchableWithoutFeedback
							onPress={() => {
								this.setState(() => {
									return { selected: 2 * i + 1 }
								}, () => this.actionSheet.show());
							}}
							style={{ flex: 1 }}>
							<Image source={{ uri: this.state.data[2 * i + 1] }} style={{ flex: 1, borderRadius: 5, margin: 5 }} />
						</TouchableWithoutFeedback>
					}
				</View>
			);
		}

		return rows;
	}

	handleAction = index => {
		switch (index) {
			case 1:
				this.setState({ visible: true });
				break;
			case 2:
				// this.http,
				break;
			case 3:
				break;
			case 4:
				const _data = this.state.data.slice();
				_data.splice(this.state.selected, 1);
				this.setState({ data: _data });
				break;
			default:
		}
	}

	openCamera = () => {
		ImagePicker.openCamera({ mediaType: 'photo' })
			.then(image => this.setState({ path: image.path }))
			.catch(() => { });
	}

	openPicker = () => {
		ImagePicker.openPicker({})
			.then(image => {
				const _data = this.state.data.slice();
				_data.push(image.path);
				this.setState({ data: _data });
			}).catch(() => { });
	}


	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* Header */}
				<View style={styles.header}>
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon color={colors.darkGray} name='menu' onPress={this.props.mainToggle} size={40} />
					</View>
					<View style={{ flex: 3 }}>
						<Text style={{ color: colors.darkGray, fontWeight: 'bold', textAlign: 'center' }}>
							My Photos
						</Text>
					</View>
					<View style={{ flex: 1 }}>
						{
							this.state.data.length < 6 &&
							<Icon
								color={colors.darkGray}
								name='photo-camera'
								onPress={() => this.actionSheetCamera.show()}
								size={40} />
						}
					</View>
				</View>

				{/* Body */}
				<View style={{ flex: 11, margin: 5 }}>
					{this.generateRows()}
				</View>

				{/* ActionSheet for current photos */}
				<ActionSheet
					cancelButtonIndex={0}
					destructiveButtonIndex={4}
					onPress={this.handleAction}
					options={[
						'Cancel',
						'View Picture',
						'Set as Profile Picture',
						'Set as Profile Background',
						'Delete'
					]}
					ref={ref => this.actionSheet = ref}
					title={'What would you like to do?'} />

				{/* ActionSheet for new photos */}
				<ActionSheet
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
					}}
					options={['Cancel', 'Use Photo Library', 'Use Camera']}
					ref={ref => this.actionSheetCamera = ref}
					title={'Where would you like to add photos from?'} />

				{/* Modal for full image view */}
				<Modal style={{ flex: 1 }} visible={this.state.visible}>
					<Swiper
						index={this.state.selected || 0}
						showsButtons={this.state.showsButtons}
						showsPagination={false}>
						{this.generateImages()}
					</Swiper>

					{	// Close button
						this.state.showsButtons &&
						<Icon
							color={colors.lightGray}
							name='close'
							onPress={() => this.setState({
								selected: false,
								showsButtons: false,
								visible: false
							})}
							size={40}
							style={{ marginLeft: 17.5, marginTop: 17, position: 'absolute' }} />
					}
				</Modal>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10
	}
});

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
	mainToggle: () => dispatch({ type: 'MAIN_TOGGLE' })
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPhotos);