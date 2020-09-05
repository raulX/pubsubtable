import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { CITIES_ROUTES } from "./router/routes";
import CityDetail from "./pages/CityDetail";
import CityList from "./pages/CityList";


const Cities = () => {
	return (
		<Switch>
			<Route
				path={CITIES_ROUTES.CITY_DETAIL(":cityId")}
				component={CityDetail}
				exact
			/>
			<Route path={CITIES_ROUTES.ROOT} component={CityList} exact />
			<Redirect to={CITIES_ROUTES.ROOT} />
		</Switch>
	);
};

export default Cities;
