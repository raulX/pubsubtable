const { citiesListMock } = require("../mock/cities-mock");
const HttpError = require("../models/http-error");

/* 
	Automatic cities data update simulation.
	Simulates an update every t between 1 and 10 seconds
 */
let citiesData = {
	lastUpdate: new Date(),
	citiesList: [...citiesListMock],
};

const updateCities = () => {
	const msToNextUpdate = Math.floor(Math.random() * 9000 + 1000);
	citiesData = {
		lastUpdate: new Date(),
		citiesList: citiesData.citiesList
			.map((city) => ({
				...city,
				pollution: +(Math.random() * 100).toFixed(2),
			}))
			.sort((a, b) => (a.pollution < b.pollution ? 1 : -1)),
	};
	setTimeout(updateCities, msToNextUpdate);
};

updateCities();

/* 
	Controller
*/

const getCities = async (req, res, next) => {
	const { count } = req.query;
	let citiesList = citiesData.citiesList;
	if (count) {
		citiesList = citiesData.citiesList.slice(0, count);
	}

	res.json({
		citiesList,
	});
};

const getCitiesLastUpdate = async (req, res, next) => {
	res.json({
		lastUpdate: citiesData.lastUpdate,
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
exports.getCitiesLastUpdate = getCitiesLastUpdate;
exports.getCityById = getCityById;
