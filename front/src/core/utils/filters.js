/**
 * Checks if any of the object fields matches the string. No case sensitive.
 * @param value String
 * @param item GenericObject
 */
export const anyFieldMatchFilter = (value, item) => {
	let passesFilter = false;
	const parsedValue = value.toLocaleLowerCase();
	Object.values(item).every((itemValue) => {
		if (String(itemValue).toLocaleLowerCase().includes(parsedValue)) {
			passesFilter = true;
			return false;
		}
		return true;
	});
	return passesFilter;
};
