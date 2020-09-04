import React from "react";

import Paper from "core/components/UIcomponents/Paper";
import Table from "core/components/table/Table";

const columns = [
	{
		id: "country",
		header: "Pais",
	},

	{
		id: "city",
		header: "Ciudad",
	},

	{
		id: "pollution",
		header: "Polución",
	},
];

const data = [...new Array(14)].map((_, index) => ({
	country: `pais ${index}`,
	city: `city ${index}`,
	pollution: (Math.random() * 100).toFixed(0).toString(),
}));

const CityList = () => {
	return (
		<Paper>
			<Table columns={columns} data={data} />
		</Paper>
	);
};

export default CityList;
