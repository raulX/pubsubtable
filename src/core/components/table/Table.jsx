import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import useTable from "core/hooks/table-hook";
import Pagination from "./components/pagination/Pagination";

const TableContainer = styled.table`
	${(props) => css`
		min-width: 500px;
		& thead th {
			font-weight: "600";
			color: ${props.theme.palette.grey[50]};
			background-color: ${props.theme.palette.primary[900]};
            padding: ${`${props.theme.spacing(3)}px`};
            text-align: initial;
		}
		& tbody td {
			font-weight: "300";
			display: table-cell;
			padding: ${`${props.theme.spacing(3)}px`};
			text-align: left;
			border-bottom: 1px solid rgba(81, 81, 81, 1);
			vertical-align: inherit;
		}
		& tbody tr:hover {
			background-color: ${props.theme.palette.action.hover};
			cursor: "pointer";
		}
	`}
`;

const Table = ({ columns, data, filterFn, actions }) => {
	const {
		filteredData,
		pageData,
		rowsPerPage,
		setRowsPerPage,
		rowsPerPageOptions,
		page,
		setPage,
	} = useTable({
		data,
	});
	const renderTableHead = () => {
		/* 
		const sortRequestHandler = (columnId) => {
			const isAsc = order.columnId === columnId && order === "asc";
			setOrder({
				columnId,
				isAsc: isAsc ? "desc" : "asc",
			});
        };
         */
		return (
			<thead>
				<tr>
					{columns.map((column) => (
						<th
							key={column.id}
							//onClick={() => sortRequestHandler(column.id)}
							//sortDirection={orderBy === column.id ? order : false}
						>
							{column.header}

							{/* 
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
                             */}
						</th>
					))}
				</tr>
			</thead>
		);
	};

	const renderTableRow = (row, rowIndex) => {
		return (
			<tr key={`crud table body row ${rowIndex}`}>
				{columns.map((column, columnIndex) => (
					<td key={`crud table body row ${columnIndex} cell ${rowIndex}`}>
						{row[column.id]}
					</td>
				))}
			</tr>
		);
	};
	return (
		<>
			<TableContainer>
				{renderTableHead()}
				<tbody>{pageData.map(renderTableRow)}</tbody>
			</TableContainer>
			<Pagination
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={rowsPerPageOptions}
				onChangeRowsPerPage={setRowsPerPage}
				page={page}
				count={filteredData.length}
				onChangePage={setPage}
			/>
		</>
	);
};

Table.propTypes = {};

export default Table;
