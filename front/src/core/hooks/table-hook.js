import { useState, useEffect } from "react";

const sortTableData = (data, order) => {
	if (!order.columnId) return data;
	return data.sort((rowA, rowB) => {
		if (order.isAsc) {
			return rowA[order.columnId] < rowB[order.columnId] ? 1 : -1;
		} else {
			return rowA[order.columnId] > rowB[order.columnId] ? 1 : -1;
		}
	});
};

const rowsPerPageOptions = [5, 10, 20, 50];

const useTable = ({ data }) => {
	const [filteredData, setFilteredData] = useState(data);
	const [pageData, setPageData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	const [order, setOrder] = useState({
		columnId: "",
		isAsc: true,
	});
	const [filterFn, setFilterFn] = useState();

	const updateFilteredData = () => {
		let updatedData = [...data];
		if (filterFn) {
			updatedData = filterFn(updatedData);
		}
		const sortedData = sortTableData(updatedData, order);
		if (sortedData.length < page * rowsPerPage) {
			setPage(0);
		}
		setFilteredData(sortedData);
		updatePageData(sortedData);
	};

	const updatePageData = (newFilteredData) => {
		const data = newFilteredData || filteredData;
		const pointer = page * rowsPerPage;
		setPageData(data.slice(pointer, pointer + rowsPerPage));
	};

	useEffect(updateFilteredData, [data, order, filterFn]);
	useEffect(updatePageData, [page]);

	return {
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
	};
};

export default useTable;
