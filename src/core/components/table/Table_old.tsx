import React, { useState } from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	makeStyles,
	TablePagination,
	TableSortLabel,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";


import { TTableColumn, TTableColumnOrder } from "./types/table-types";
import { stableSort, getComparator } from "./utils";

const useStyles = makeStyles((theme) => ({
	table: {
		marginTop: theme.spacing(3),
		"& thead th": {
			fontWeight: "600",
			color: theme.palette.grey[50],
			backgroundColor: blue[900],
		},
		"& tbody td": {
			fontWeight: "300",
		},
		"& tbody tr:hover": {
			backgroundColor: theme.palette.action.hover,
			cursor: "pointer",
		},
	},
	pagination: {
		display: "flex",
		justifyContent: "flex-end",
		flexGrow: 1,
	},
}));


const useTable = <T extends {}>(
	columns: TTableColumn[],
	data: T[],
	filterFn?: {
		fn: (data: T[]) => T[];
	}
) => {
	const classes = useStyles();
	const pages = [5, 10, 20];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[0]);
	const [order, setOrder] = useState<TTableColumnOrder>();
	const [orderBy, setOrderBy] = useState<string | undefined>();

	const TBLContainer = (props: any) => (
		<Table className={classes.table}>{props.children}</Table>
	);

	const TBLHead = (props: any) => {
		const sortRequestHandler = (columnId: string) => {
			const isAsc = orderBy === columnId && order === "asc";
			setOrder(isAsc ? "desc" : "asc");
			setOrderBy(columnId);
		};
		return (
			<TableHead>
				<TableRow>
					{columns.map((column) => (
						<TableCell
							key={column.id}
							onClick={() => sortRequestHandler(column.id)}
							sortDirection={orderBy === column.id ? order : false}
						>
							{column.disableSorting ? (
								column.label
							) : (
								<TableSortLabel
									active={orderBy === column.id}
									direction={orderBy === column.id ? order : "asc"}
								>
									{column.label}
								</TableSortLabel>
							)}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	};

	const pageChangeHandler = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const changeRowsPerPageHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const TBLPagination = () => (
		<TablePagination
			className={classes.pagination}
			component="div"
			rowsPerPage={rowsPerPage}
			rowsPerPageOptions={pages}
			page={page}
			count={data.length}
			onChangePage={pageChangeHandler}
			onChangeRowsPerPage={changeRowsPerPageHandler}
			labelRowsPerPage="Filas por pagina"
			labelDisplayedRows={({ from, to, count }) => `
				${from}-${to} de ${count}`}
		/>
	);

	const dataAfterSortAndFilt = (): typeof data => {
		return stableSort(
			filterFn?.fn ? filterFn.fn(data) : data,
			getComparator(order, orderBy)
		).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
	};

	return {
		TBLContainer,
		TBLHead,
		TBLPagination,
		dataAfterSortAndFilt,
	};
};

export default useTable;
