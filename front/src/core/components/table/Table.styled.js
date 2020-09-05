import styled, { css } from "styled-components";

import Input from "../controls/Input";

const THeadCell = styled.th`
	${(props) => css`
		font-weight: "600";
		color: ${props.theme.palette.grey[50]};
		background-color: ${props.theme.palette.primary[900]};
		padding: ${`${props.theme.spacing(3)}px`};
		text-align: initial;
		${props.onClick &&
		css`
			cursor: pointer;
			&:hover {
				background-color: ${props.theme.palette.primary[700]};
			}
		`}
	`}
`;

const TBodyCell = styled.td`
	font-weight: "300";
	display: table-cell;
	padding: ${(props) => `${props.theme.spacing(3)}px`};
	text-align: left;
	border-bottom: 1px solid rgba(81, 81, 81, 1);
	vertical-align: inherit;
`;

const TableContainer = styled.table`
	${(props) => css`
		min-width: 500px;
	`}
`;

const SearchInput = styled(Input)`
	width: 100%;
	max-width: 600px;
`;

const Container = styled.div`
	& > :not(:last-child) {
		margin-bottom: ${(props) => `${props.theme.spacing(2)}px`};
	}
`;

export default {
	TableContainer,
	THeadCell,
	TBodyCell,
	Container,
	SearchInput,
};
