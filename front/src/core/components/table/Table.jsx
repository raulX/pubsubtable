import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import useTable from "core/hooks/table-hook";
import { anyFieldMatchFilter } from "core/utils/filters";

import Pagination from "./components/pagination/Pagination";

import Styled from "./Table.styled";
import { getObjectValue } from "core/utils/object";

const Table = ({ columns, data }) => {
	const {
		filteredData,
		pageData,
		rowsPerPage,
		setRowsPerPage,
		rowsPerPageOptions,
		page,
		setPage,
		order,
		setOrder,
		setFilterFn,
	} = useTable({
		data,
	});

	const [searchText, setSearchText] = useState("");

	const changeSearchTextHandler = (event) => {
		setSearchText(event.target.value);
	};

	const searchSubmitHanlder = (event) => {
		if (event) {
			event.preventDefault();
		}
		setFilterFn(() => (data) => {
			return searchText === ""
				? data
				: data.filter((item) => anyFieldMatchFilter(searchText, item));
		});
	};

	const clearFilter = () => {
		setSearchText("");
		setFilterFn(null);
	};

	const renderTableHeadCell = (column) => {
		const sortRequestHandler = () => {
			const isAsc = !(order.columnId === column.id && order.isAsc);
			setOrder({
				columnId: column.id,
				isAsc,
			});
		};
		return (
			<Styled.THeadCell
				key={column.id}
				onClick={column.disableSort ? null : sortRequestHandler}
			>
				{column.header}
				{order.columnId === column.id && ` ${order.isAsc ? "↓" : "↑"}`}
			</Styled.THeadCell>
		);
	};

	const renderTableRow = (row, rowIndex) => {
		return (
			<tr key={`crud table body row ${rowIndex}`}>
				{columns.map((column, columnIndex) => (
					<Styled.TBodyCell key={`crud table body row ${columnIndex} cell ${rowIndex}`}>
						{column.Cell ? column.Cell(row) : getObjectValue(row, column.id)}
					</Styled.TBodyCell>
				))}
			</tr>
		);
	};

	return (
		<Styled.Container>
			<form onSubmit={searchSubmitHanlder}>
				<Styled.SearchInput
					value={searchText}
					onChange={changeSearchTextHandler}
					label="Buscar..."
					InputProps={{
						endAdornment: (
							<>
								<IconButton onClick={clearFilter}>
									<ClearIcon></ClearIcon>
								</IconButton>
								<IconButton onClick={searchSubmitHanlder}>
									<SearchIcon />
								</IconButton>
							</>
						),
					}}
				/>
			</form>
			<Styled.TableContainer>
				<thead>
					<tr>{columns.map(renderTableHeadCell)}</tr>
				</thead>
				<tbody>{pageData.map(renderTableRow)}</tbody>
			</Styled.TableContainer>
			<Pagination
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={rowsPerPageOptions}
				onChangeRowsPerPage={setRowsPerPage}
				page={page}
				count={filteredData.length}
				onChangePage={setPage}
			/>
		</Styled.Container>
	);
};

Table.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			header: PropTypes.string.isRequired,
			cell: PropTypes.node,
			disableSort: PropTypes.bool,
		}).isRequired
	).isRequired,
	data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default Table;
