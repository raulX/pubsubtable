const citiesListMock = [...new Array(1000)].map((_, index) => ({
	id: index,
	country: `pais ${index}`,
	city: {
		id: index,
		label: `city ${index}`,
	},
	pollution: +(Math.random() * 100).toFixed(2),
	location: {
		lat: 40.465952,
		lng: -3.689391,
	},
}));

exports.citiesListMock = citiesListMock;
