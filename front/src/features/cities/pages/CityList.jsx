import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import Paper from "core/components/UIcomponents/Paper";
import Table from "core/components/table/Table";
import { CITIES_ROUTES } from "../router/routes";
import { CircularProgress } from "@material-ui/core";
import { cityListSocket } from "app/api/socketApi";
import useSocket from "core/hooks/socket-hook";
import { ENDPOINTS } from "app/api";

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
				<Link to={CITIES_ROUTES.CITY_DETAIL(row.city.id)}>Ver mapa</Link>
			);
		},
	},
];

const CityList = () => {
	const { data } = useQuery(
		"citiesList",
		() =>
			fetch(ENDPOINTS.CITIES.LIST(100)).then((res) =>
				res.json()
			),
		{
			//Polling method
			//refetchInterval: 3000,
		}
	);

	//PubSub method
	const socketData = useSocket(cityListSocket);

	return (
		<Paper>
			{!data && !socketData ? (
				<CircularProgress />
			) : (
				<Table
					columns={columns}
					data={socketData?.cityList || data?.cityList }
				/>
			)}
		</Paper>
	);
};

export default CityList;
