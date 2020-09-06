export const citiyListMock = [...new Array(140)].map((_, index) => ({
	country: `pais ${index}`,
	city: {
		id: index,
		label: `city ${index}`,
	},
	pollution: +(Math.random() * 100).toFixed(2),
}));
