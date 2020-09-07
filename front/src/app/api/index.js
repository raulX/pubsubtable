import { getUrlWithSearchParams } from "core/utils/url";

const apiRoot = "http://localhost:5000/api";

export const ENDPOINTS = {
	CITIES: {
		LIST: (count) => getUrlWithSearchParams(`${apiRoot}/cities`, { count }),
		DETAIL: (cityId) => `${apiRoot}/cities/${cityId}`,
	},
};
