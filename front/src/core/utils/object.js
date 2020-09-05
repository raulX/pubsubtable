
/**
  Given an object and an accessor, gets the value of the accessor.
  If the accessor does not exist, returns undefined.
 * @param object GenericObject
 * @param accessor string
 */

export const getObjectValue = (object, accessor = "") => {
	if (typeof accessor !== "string" || accessor === "" || !object)
		return undefined;
	const [fieldName, ...acc] = accessor.split(".");
	const restOfTheAccessor = acc.join(".");
	if (object[fieldName] === undefined || object[fieldName] === null) {
		return undefined;
	}
	if (!restOfTheAccessor) {
		return object[fieldName];
	}
	return getObjectValue(object[fieldName], restOfTheAccessor);
};
