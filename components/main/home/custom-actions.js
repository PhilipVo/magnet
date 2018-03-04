import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';

import { colors } from '../../../etc/constants';

export default class CustomActions extends React.Component {
	openCamera = () => {
		ImagePicker.openCamera({ mediaType: 'photo' })
			.then(image => this.props.onSend([{ image: image.path }]))
			.catch(() => { });
	}

	openPicker = () => {
		ImagePicker.openPicker({ mediaType: 'photo', multiple: true })
			.then(images => {
				this.props.onSend(images.map(image => {
					return { image: image.path };
				}));
			}).catch(() => { });
	}

	render() {
		return (
			<View style={styles.container}>
				<Icon color={colors.lightGray} name='photo-camera' onPress={this.openCamera} size={30} />
				<Icon color={colors.lightGray} name='photo' onPress={this.openPicker} size={30} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 0.25,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 8
	}
});