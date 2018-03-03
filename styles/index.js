import { Dimensions, StyleSheet } from 'react-native';

export const constants = {
	blue: '#1d41a8',
	darkGray: '#888888',
	darkGreen: '#68bf00',
	green: '#8bff00',
	lightGreen: '#baff67',
	lightGray: '#bbbbbb',
	offWhite: '#eeeeee'
}

export default StyleSheet.create({
	already: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 10,
		fontWeight: 'bold'
	},
	button: {
		height: 50,
		justifyContent: 'center',
		padding: 5,
	},
	background: {
		height: Dimensions.get('window').height,
		position: 'absolute',
		width: Dimensions.get('window').width
	},
	bottomButton: {
		alignItems: 'center',
		flex: 1,
		height: 50,
		justifyContent: 'center'
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'
	},
	centeredView: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	homeHeader: { 
		alignItems: 'center',
		backgroundColor: constants.lightGray,
		flex: 1,
		flexDirection: 'row',
		paddingTop: 10,
		justifyContent: 'space-around'
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
		marginBottom: 10,
		padding: 10
	},
	searchInput: {
		backgroundColor: constants.offWhite,
		borderRadius: 5,
		margin: 5,
		padding: 12,
		paddingLeft: 30,
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