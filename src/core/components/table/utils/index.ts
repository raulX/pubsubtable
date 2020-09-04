import { TGenericObject } from "core/types";
import { TTableColumnOrder } from "../types/table-types";


export const stableSort = (array: any, comparator: any) => {
	const stabilizedThis = array.map((el: any, index: any) => [el, index]);
	stabilizedThis.sort((a: any, b: any) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el: any) => el[0]);
};

export const getComparator = (order: TTableColumnOrder, orderBy: string | undefined) => {
	return order === "desc"
		? (a: TGenericObject, b: TGenericObject) =>
				descendingComparator(a, b, orderBy)
		: (a: TGenericObject, b: TGenericObject) =>
				-descendingComparator(a, b, orderBy);
};

const descendingComparator = (
	a: TGenericObject,
	b: TGenericObject,
	orderBy: string | undefined
) => {
	if (orderBy === undefined) return 0;
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
};
