import styled, { css } from "styled-components";

const Option = styled.button`
	font-size: 1.1rem;
	width: 2.2rem;
	height: 2.2rem;
	border-radius: 50%;
	border: var(--border);
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) => css`
		background-color: #fff;
		&:hover {
			background: ${props.theme.palette.action.hover};
			cursor: pointer;
		}
		${props.active &&
		css`
			background: ${props.theme.palette.action.selected};
		`}
	`}
`;

const Navigation = styled.div`
	display: flex;
`;

const Info = styled.div`
	span {
		font-size: 1.2rem;
	}
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: ${(props) => `${props.theme.spacing(1)}px`};
	& > :not(:last-child) {
		margin-right: ${(props) => `${props.theme.spacing(2)}px`};
	}
`;

export default {
	Container,
	Navigation,
	Option,
	Info,
};
