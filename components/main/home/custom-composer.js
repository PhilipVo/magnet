import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { colors } from '../../../etc/constants';

export default class Composer extends React.Component {
	onContentSizeChange(e) {
		const { contentSize } = e.nativeEvent;

		// Support earlier versions of React Native on Android.
		if (!contentSize) return;

		if (
			!this.contentSize ||
			this.contentSize.width !== contentSize.width ||
			this.contentSize.height !== contentSize.height
		) {
			this.contentSize = contentSize;
			this.props.onInputSizeChanged(this.contentSize);
		}
	}

	onChangeText(text) {
		this.props.onTextChanged(text);
	}

	render() {
		const valid = this.props.text.trim().length > 0;
		return (
			<View style={styles.container}>
				<TextInput
					placeholder={this.props.placeholder}
					placeholderTextColor={this.props.placeholderTextColor}
					multiline={this.props.multiline}
					onChange={(e) => this.onContentSizeChange(e)}
					onContentSizeChange={(e) => this.onContentSizeChange(e)}
					onChangeText={(text) => this.onChangeText(text)}
					style={[styles.textInput, this.props.textInputStyle, { height: this.props.composerHeight }]}
					autoFocus={this.props.textInputAutoFocus}
					value={this.props.text}
					accessibilityLabel={this.props.text || this.props.placeholder}
					enablesReturnKeyAutomatically
					underlineColorAndroid="transparent"
					keyboardAppearance={this.props.keyboardAppearance}
					{...this.props.textInputProps}
				/>
				<Icon
					color={valid ? colors.blue : colors.lightGray}
					name='send'
					onPress={() => valid && this.props.onSend({ text: this.props.text.trim() }, true)}
					size={20}
					style={{ alignSelf: 'flex-end', marginBottom: 10, marginRight: 10 }} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderColor: colors.lightGray,
		borderRadius: 15,
		borderWidth: 1,
		flex: 1,
		flexDirection: 'row',
		marginRight: 2
	},
	textInput: {
		flex: 1,
		fontSize: 14,
		lineHeight: 14,
		marginHorizontal: 10,
		marginTop: Platform.select({
			ios: 5,
			android: 0,
		}),
		marginBottom: Platform.select({
			ios: 4,
			android: 3,
		}),
	},
});

Composer.defaultProps = {
	composerHeight: null,
	text: '',
	onSend: () => { },
	placeholderTextColor: 'lightgray',
	placeholder: 'Type a message',
	textInputProps: null,
	multiline: true,
	textInputStyle: {},
	textInputAutoFocus: false,
	keyboardAppearance: 'default',
	onTextChanged: () => { },
	onInputSizeChanged: () => { },
};

Composer.propTypes = {
	composerHeight: PropTypes.number,
	text: PropTypes.string,
	onSend: PropTypes.func,
	placeholder: PropTypes.string,
	placeholderTextColor: PropTypes.string,
	textInputProps: PropTypes.object,
	onTextChanged: PropTypes.func,
	onInputSizeChanged: PropTypes.func,
	multiline: PropTypes.bool,
	textInputStyle: TextInput.propTypes.style,
	textInputAutoFocus: PropTypes.bool,
	keyboardAppearance: PropTypes.string,
};