import styled from "styled-components";

const Paper = styled.div`
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
	padding: ${(props) => `${props.theme.spacing(3)}px`};
`;

export default Paper;
