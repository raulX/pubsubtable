const { citiesListMock } = require("../mock/cities-mock");
const HttpError = require("../models/http-error");

/* 
	Automatic cities data update simulation.
	Simulates an update every t between 1 and 6 seconds
 */
let citiesData = [...citiesListMock];

const updateCities = () => {
	const msToNextUpdate = Math.floor(Math.random() * 5000 + 1000);
	console.log("UPDATE", msToNextUpdate);
	citiesData = citiesData
		.map((city) => ({
			...city,
			pollution: +(Math.random() * 100).toFixed(2),
		}))
		.sort((a, b) => (a.pollution < b.pollution ? 1 : -1));

	setTimeout(updateCities, msToNextUpdate);
};

updateCities();


const getCities = async (req, res, next) => {
	const { count } = req.query;

	let cities = citiesData;
	if (count) {
		cities = cities.slice(0, count);
	}

	res.json({
		cities,
	});
};

const getCityById = async (req, res, next) => {
	const { cityId } = req.params;

	const city = citiesData.find((city) => city.id == cityId);
	if (!city) {
		return next(new HttpError("Could not find city", 404));
	}
	res.json({ city: city });
};

exports.getCities = getCities;
exports.getCityById = getCityById;
