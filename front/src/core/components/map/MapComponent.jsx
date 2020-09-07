import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
	width: "45rem",
	maxWidth: "80vw",
	height: "20rem",
};

const MapComponent = ({ isMarkerShown, lat, lng }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
	});

	if (loadError) return "Error loading maps";
	if (!isLoaded) return "Loading Maps";
	return (
		<GoogleMap
			mapContainerStyle={mapContainerStyle}
			zoom={8}
			center={{ lat, lng }}
		>
			{isMarkerShown && <Marker position={{ lat, lng }} />}
		</GoogleMap>
	);
};

export default MapComponent;
