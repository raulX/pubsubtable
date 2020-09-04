import { useState, useEffect } from "react";

const rowsPerPageOptions = [5, 10, 20];

const useTable = ({ columns, data, filterFn }) => {
	const [filteredData, setFilteredData] = useState(data);
	const [pageData, setPageData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	const [pageCount, setPageCount] = useState(0);
	const [order, setOrder] = useState({
		columnId: "",
		isAsc: "asc",
	});

	const updatePageData = () => {
		const pointer = page * rowsPerPage;
		setPageData(filteredData.slice(pointer, pointer + rowsPerPage));
	};

	useEffect(updatePageData, [data, page]);

	return {
		filteredData,
		pageData,
		rowsPerPage,
		setRowsPerPage,
		rowsPerPageOptions,
		page,
		setPage,
	};
};

export default useTable;
