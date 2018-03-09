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
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { colors } from '../../../etc/constants';

class Photos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			selected: false,
			showsButtons: false
		};
	}

	componentDidMount() {
		this.setState({
			data: [
				'https://crossroadstrading.com/wp-content/uploads/2017/06/Badass.jpg',
				'https://images.britcdn.com/wp-content/uploads/2018/01/Gal-Gadot-PGA-2018.jpg?fit=max&w=1440',
				'https://vignette.wikia.nocookie.net/wonderwoman/images/5/5a/Gal_Gadot_as_Wonder_Woman_Time_Magazine.jpg/revision/latest?cb=20161220142522',
				'https://wallpapersite.com/images/wallpapers/gal-gadot-3840x2560-4k-7094.jpg',
				'https://pmcvariety.files.wordpress.com/2016/10/gal-gadot-wonder-woman.jpg?w=1000&h=563&crop=1',
				// 'https://media1.popsugar-assets.com/files/thumbor/tCsEyLRDUTf2nb2lVf_Qyt-bbFc/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/07/29/687/n/1922283/fb7d4016_edit_img_image_42118802_1469753900/i/Gal-Gadot-Movies.jpg',
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
					style={{ flex: 1 }}>
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
							onPress={() => this.setState({ selected: 2 * i })}
							style={{ flex: 1 }}>
							<Image source={{ uri: this.state.data[2 * i] }} style={{ flex: 1, borderRadius: 5, margin: 5 }} />
						</TouchableWithoutFeedback>
					}
					{
						this.state.data[2 * i + 1] &&
						<TouchableWithoutFeedback
							onPress={() => this.setState({ selected: 2 * i + 1 })}
							style={{ flex: 1 }}>
							<Image source={{ uri: this.state.data[2 * i + 1] }} style={{ flex: 1, borderRadius: 5, margin: 5 }} />
						</TouchableWithoutFeedback>
					}
				</View>
			);
		}

		return rows;
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* Header */}
				<View style={styles.header}>
					<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
						<Icon color={colors.lightGray} name='chevron-left' onPress={this.props.homeBack} size={40} />
					</View>
					<View style={{ flex: 3 }}>
						<Text style={{ color: colors.darkGray, fontWeight: 'bold', textAlign: 'center' }}>
							Photos
						</Text>
					</View>
					<View style={{ flex: 1 }} />
				</View>

				{/* Body */}
				<View style={{ flex: 11, margin: 5 }}>
					{this.generateRows()}
				</View>

				{/* Modal for full image view */}
				<Modal style={{ flex: 1 }} visible={this.state.selected !== false}>
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
							onPress={() => this.setState({ selected: false, showsButtons: false })}
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
	id: props.navigation.state.params.id
});

const mapDispatchToProps = dispatch => ({
	homeBack: () => dispatch({ type: 'HOME_BACK' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);