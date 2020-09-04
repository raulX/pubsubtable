import { ROUTES } from "app/router/routes";

const root = ROUTES.CITIES;

export const CITIES_ROUTES = {
	ROOT: root,
	CITY_DETAIL: (cityId) => `${root}/${cityId}`,
};
