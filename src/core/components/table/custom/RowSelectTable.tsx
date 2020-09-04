import React, { useState, ChangeEvent } from "react";
import {
	Grid,
	TableBody,
	TableRow,
	TableCell,
	Toolbar,
	InputAdornment,
	makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { TTableColumn } from "core/components/table/types/table-types";
import useTable from "core/components/table/Table";
import Controls from "core/components/controls/Controls";
import { anyFieldMatchFilter } from "core/utils/filters";

const useStyles = makeStyles(() => ({
	toolBar: {
		flex: 1,
		justifyContent: "space-between",
	},
	searchInput: {
		width: "75%",
	},
}));

type TRowSelectTableProps<T> = {
	data: T[];
	columns: TTableColumn[];
	onSelectRow: (selectedRow: T) => void;
};

const RowSelectTable = <T extends { [key: string]: any }>(
	props: TRowSelectTableProps<T>
) => {
	const classes = useStyles();
	const [filterFn, setFilterFn] = useState<{
		fn: (data: T[]) => T[];
	}>();

	const {
		TBLContainer,
		TBLHead,
		TBLPagination,
		dataAfterSortAndFilt,
	} = useTable(props.columns, props.data, filterFn);

	const searchHandler = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { value } = event.target;
		setFilterFn({
			fn: (data: T[]) =>
				value === ""
					? data
					: data.filter((item) => anyFieldMatchFilter(value, item)),
		});
	};

	const renderTableRow = (item: T, itemIndex: number) => {
		const selectRowHandler = () => {
			props.onSelectRow(item);
		};
		return (
			<TableRow
				key={`crud table body row ${itemIndex}`}
				onClick={selectRowHandler}
			>
				{props.columns.map((column, columnIndex) => (
					<TableCell
						key={`crud table body row ${columnIndex} cell ${itemIndex}`}
					>
						{item[column.id]}
					</TableCell>
				))}
			</TableRow>
		);
	};
	return (
		<>
			<Grid container>
				<Toolbar disableGutters className={classes.toolBar}>
					<Controls.Input
						label="Buscar"
						className={classes.searchInput}
						onChange={searchHandler}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</Toolbar>
				<TBLContainer>
					<TBLHead />
					<TableBody>
						{dataAfterSortAndFilt().map((item, itemIndex) =>
							renderTableRow(item, itemIndex)
						)}
					</TableBody>
				</TBLContainer>
				<TBLPagination />
			</Grid>
		</>
	);
};

export default RowSelectTable;
