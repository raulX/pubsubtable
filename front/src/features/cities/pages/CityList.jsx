import React from "react";

import Paper from "core/components/UIcomponents/Paper";
import Table from "core/components/table/Table";
import { Link } from "react-router-dom";
import { CITIES_ROUTES } from "../router/routes";

const columns = [
	{
		id: "country",
		header: "Pais",
	},

	{
		id: "city.label",
		header: "Ciudad",
	},
	{
		id: "pollution",
		header: "Polución (%)",
	},
	{
		id: "actions",
        header: "Acciones",
        disableSort: true,
		Cell: (row) => {
			return (
				<Link to={CITIES_ROUTES.CITY_DETAIL(row.city.id)}>Ver detalle</Link>
			);
		},
	},
];

const data = [...new Array(140)].map((_, index) => ({
	country: `pais ${index}`,
	city: {
		id: index,
		label: `city ${index}`,
	},
	pollution: +(Math.random() * 100).toFixed(2),
}));

const CityList = () => {
	return (
		<Paper>
			<Table columns={columns} data={data} />
		</Paper>
	);
};

export default CityList;
