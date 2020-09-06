import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import Paper from "core/components/UIcomponents/Paper";
import Table from "core/components/table/Table"
import { CITIES_ROUTES } from "../router/routes";;

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

const CityList = () => {
	const { data } = useQuery(
		"citiesList",
		() =>
			fetch("http://localhost:5000/api/cities?count=100").then((res) =>
				res.json()
			),
		{
			refetchInterval: 3000,
		}
	);
	return (
		<Paper>{data && <Table columns={columns} data={data.citiesList} />}</Paper>
	);
};

export default CityList;
