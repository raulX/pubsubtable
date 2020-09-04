import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 100px;
	height: 100vh;
	background-color: ${(props) => props.theme.palette.background.default};
	font-family: Avenir, "Avenir Next", "Segoe UI", sans-serif;
	font-weight: regular;
`;

export default Container;
