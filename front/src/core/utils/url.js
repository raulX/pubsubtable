
/**
  Given an url and an object of searchParams, returns the url with every
  params with value !== undefined
 * @param url string
 * @param params object
 */


export const getUrlWithSearchParams = (url, params) => {
	const urlObj = new URL(url);
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			urlObj.searchParams.append(key, value);
		}
	});
	return urlObj.href;
};
