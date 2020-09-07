import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "app/api";

const CityDetail = () => {
    const {cityId} = useParams();
	const { data } = useQuery(
		"cityDetail",
		() =>
			fetch(ENDPOINTS.CITIES.DETAIL(cityId)).then((res) =>
				res.json()
			),
    );
    console.log("CityDetail -> data", data)
    
	return <div>Ciudad</div>;
};

export default CityDetail;
