import { StyleSheet } from 'react-native';

export const constants = {
	blue: "#1d41a8",
	lime: "#8bff00"
}

export default StyleSheet.create({
	already: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 10,
		fontWeight: 'bold'
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'
	},
	create: {
		backgroundColor: constants.lime,
		height: 50,
		justifyContent: 'center',
		marginTop: 15,
		padding: 5,
	},
	facebook: {
		backgroundColor: '#3b5998',
		height: 50,
		justifyContent: 'center',
		padding: 5,
	},
	input: {
		backgroundColor: 'white',
		color: 'black',
		fontSize: 16,
		height: 50,
		marginBottom: 10,
		padding: 10
	},
	whiteText: {
		backgroundColor: 'transparent',
		color: 'white',
		textAlign: 'center'
	},
	or: {
		backgroundColor: 'transparent',
		color: 'white',
		fontWeight: 'bold'
	},
	orDivider: {
		backgroundColor: 'white',
		height: 0.5,
		width: 100
	},
	orView: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 15
	},
	sign: {
		backgroundColor: 'transparent',
		color: constants.blue,
		fontSize: 10,
		fontWeight: 'bold'
	},
});