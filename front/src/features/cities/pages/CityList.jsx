import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import openSocket from "socket.io-client";

import Paper from "core/components/UIcomponents/Paper";
import Table from "core/components/table/Table";
import { CITIES_ROUTES } from "../router/routes";
import { CircularProgress } from "@material-ui/core";

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
	const [data, setData] = useState();
	//Polling method
	/* 
	const { data } = useQuery(
		"citiesList",
		() =>
			fetch("http://localhost:5000/api/cities?count=100").then((res) =>
				res.json()
			),
		{
			//refetchInterval: 3000,
		}
	);
	 */
	 
	 //PubSub method

	const initialize = () => {
		const socket = openSocket("http://localhost:5000");
		socket.on("citiyList", (backendData) => {
			setData({
				cityList: backendData.cityList,
			});
		});
	};
	useEffect(initialize, []);

	return (
		<Paper>
			{!data ? (
				<CircularProgress />
			) : (
				<Table columns={columns} data={data.cityList} />
			)}
		</Paper>
	);
};

export default CityList;
