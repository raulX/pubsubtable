import React from "react";
import PropTypes from "prop-types";

import Styled from "./Pagination.styled";
import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const getPaginationInfo = (page, rowsPerPage, count) => {
	const initialElement = page * rowsPerPage;
	const lastElement = (page + 1) * rowsPerPage;
	return `${initialElement} - ${
		lastElement < count ? lastElement : count
	} de ${count}`;
};

const Pagination = ({
	className,
	rowsPerPage,
	rowsPerPageOptions,
	onChangeRowsPerPage,
	page,
	count,
	onChangePage,
}) => {
	return (
		<Styled.Container className={`pagination ${className}`}>
			<Styled.Info className="pagination__info">
				{getPaginationInfo(page, rowsPerPage, count)}
			</Styled.Info>
			<Styled.Navigation className="pagination__navigation">
				<IconButton
					onClick={() => onChangePage(page - 1)}
					disabled={page === 0}
				>
					<ArrowBackIosIcon />
				</IconButton>
				<IconButton
					onClick={() => onChangePage(page + 1)}
					disabled={(page + 1) * rowsPerPage >= count}
				>
					<ArrowForwardIosIcon />
				</IconButton>
			</Styled.Navigation>
		</Styled.Container>
	);
};

Pagination.propTypes = {
};

Pagination.defaultProps = {
};

export default Pagination;
