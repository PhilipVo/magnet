const colors = {
	blue: '#1d41a8',
	darkGray: '#888888',
	darkGreen: '#68bf00',
	green: '#8bff00',
	lightGreen: '#baff67',
	lightGray: '#bbbbbb',
	offWhite: '#eeeeee'
};

module.exports = {
	colors: colors,
	milesToMeters: miles => Math.round(miles * 1609.34),
	feetToMeters: feet => Math.round(feet * 0.3048)
};