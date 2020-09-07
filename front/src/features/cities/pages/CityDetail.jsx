import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { ENDPOINTS } from "app/api";
import MapComponent from "core/components/map/MapComponent";
import Paper from "core/components/UIcomponents/Paper";
import { CircularProgress } from "@material-ui/core";
import Button from "core/components/controls/Button";
import { CITIES_ROUTES } from "../router/routes";

const Title = styled.div`
	margin-bottom: ${(props) => `${props.theme.spacing(2)}px`};
	display: flex;
	justify-content: space-between;
`;

const CityDetail = () => {
	const { cityId } = useParams();
	const { data } = useQuery("cityDetail", () =>
		fetch(ENDPOINTS.CITIES.DETAIL(cityId)).then((res) => res.json())
	);

	return (
		<Paper>
			{!data ? (
				<CircularProgress />
			) : (
				<>
					<Title>
						<h1>{data.city.city.label}</h1>
						<Button text="VOLVER" to={CITIES_ROUTES.ROOT} />
					</Title>
					<div>
						<MapComponent
							isMarkerShown={true}
							lat={data.city.location.lat}
							lng={data.city.location.lng}
						/>
					</div>
				</>
			)}
		</Paper>
	);
};

export default CityDetail;
