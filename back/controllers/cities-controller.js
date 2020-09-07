const { citiesListMock } = require("../mock/cities-mock");
const CityList = require("../classes/CityList");
const HttpError = require("../models/http-error");
const io = require("../socket");

/* 
	Automatic cities data update simulation.
	Simulates an update every t between 1 and 10 seconds
 */

const cityList = new CityList(citiesListMock);
const updateCities = () => {
	const msToNextUpdate = Math.floor(Math.random() * 3000 + 1000);
	cityList.randomizeCitiesData();
	try {
		io.getIO().emit("citiyList", { action: "updated", cityList: cityList.list.slice(0, 100) });
	} catch (error) {
		//console.log("CityList -> randomizeCitiesData -> error", error);
	}finally{
		setTimeout(updateCities, msToNextUpdate);
	}
};
updateCities();

/* 
	Controller
*/

const getCities = async (req, res, next) => {
	const { count } = req.query;
	let list = cityList.list;
	if (count) {
		list = cityList.list.slice(0, count);
	}

	res.json({
		cityList: list,
	});
};

const getCityById = async (req, res, next) => {
	const { cityId } = req.params;

	const city = cityList.list.find((city) => city.id == cityId);
	if (!city) {
		return next(new HttpError("Could not find city", 404));
	}
	res.json({ city: city });
};

exports.getCities = getCities;
exports.getCityById = getCityById;
