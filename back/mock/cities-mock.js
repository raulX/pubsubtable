const citiesListMock = [...new Array(14)].map((_, index) => ({
	id: index,
	country: `pais ${index}`,
	city: {
		id: index,
		label: `city ${index}`,
	},
	pollution: +(Math.random() * 100).toFixed(2),
}));

exports.citiesListMock = citiesListMock;
