import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const TableContainer = styled.table`
	${(props) => css`
		margin-top: ${`${props.theme.spacing(3)}px`};
		& thead th {
			font-weight: "600";
			color: ${props.theme.palette.grey[50]};
			background-color: ${props.theme.palette.primary[900]};
		}
		& tbody td {
			font-weight: "300";
		}
		& tbody tr:hover {
			background-color: ${props.theme.palette.action.hover};
			cursor: "pointer";
		}
	`}
`;

const Table = ({ columns, data, filterFn }) => {
	const pages = [5, 10, 20];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[0]);
	const [order, setOrder] = useState({
		columnId: "",
		isAsc: "asc",
	});

	const renderTableHead = () => {
		const sortRequestHandler = (columnId) => {
			const isAsc = order.columnId === columnId && order === "asc";
			setOrder({
				columnId,
				isAsc: isAsc ? "desc" : "asc",
			});
		};
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
	return <TableContainer></TableContainer>;
};

Table.propTypes = {};

export default Table;
