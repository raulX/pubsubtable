import React, { useState, ChangeEvent } from "react";
import {
	Grid,
	TableBody,
	TableRow,
	TableCell,
	Toolbar,
	InputAdornment,
	makeStyles,
	IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

type TCRUDTableProps<T> = {
	data: T[];
	columns: TTableColumn[];
	onEditOrAdd?: React.Dispatch<T | {}>;
	onDelete?: React.Dispatch<T>;
};

const addActionColumn = (
	columns: TTableColumn[],
	hasActionColumn: boolean
): TTableColumn[] => {
	if (hasActionColumn) {
		return [
			...columns,
			{
				id: "actions",
				label: "Acciones",
			},
		];
	}
	return columns;
};

const CRUDTable = <T extends { [key: string]: any }>(
	props: TCRUDTableProps<T>
) => {
	const hasActionColumn =
		props.onEditOrAdd !== undefined || props.onDelete !== undefined;
	const classes = useStyles();
	const [filterFn, setFilterFn] = useState<{
		fn: (data: T[]) => T[];
	}>();

	const {
		TBLContainer,
		TBLHead,
		TBLPagination,
		dataAfterSortAndFilt,
	} = useTable(
		addActionColumn(props.columns, hasActionColumn),
		props.data,
		filterFn
	);

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

	const addCharacteristicHandler = () => {
		props.onEditOrAdd!({});
	};

	const renderTableRow = (item: T, itemIndex: number) => {
		const editCharHandler = () => {
			props.onEditOrAdd!(item);
		};
		const deleteCharHandler = () => {
			props.onDelete!(item);
		};
		return (
			<TableRow key={`crud table body row ${itemIndex}`}>
				{props.columns.map((column, columnIndex) => (
					<TableCell
						key={`crud table body row ${columnIndex} cell ${itemIndex}`}
					>
						{item[column.id]}
					</TableCell>
				))}
				{hasActionColumn && (
					<TableCell>
						{props.onEditOrAdd && (
							<IconButton onClick={editCharHandler}>
								<EditIcon />
							</IconButton>
						)}
						{props.onDelete && (
							<IconButton onClick={deleteCharHandler}>
								<DeleteIcon />
							</IconButton>
						)}
					</TableCell>
				)}
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
					{props.onEditOrAdd && (
						<Controls.Button
							text="AÑADIR"
							startIcon={<AddIcon />}
							onClick={addCharacteristicHandler}
						/>
					)}
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

export default CRUDTable;
