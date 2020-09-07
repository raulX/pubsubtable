
class CityList {
	lastUpdate = new Date();
	list = [];

	constructor(list) {
		this.list = [...list];
	}

	randomizeCitiesData() {
		this.list = this.list
			.map((city) => ({
				...city,
				pollution: +(Math.random() * 100).toFixed(2),
			}))
			.sort((a, b) => (a.pollution < b.pollution ? 1 : -1));
		this.lastUpdate = new Date();		
    }
}

module.exports = CityList;
