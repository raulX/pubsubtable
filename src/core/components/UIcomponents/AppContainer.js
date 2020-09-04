import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: ${(props) => props.theme.palette.background.default};
	font-family: Avenir, "Avenir Next", "Segoe UI", sans-serif;
	font-weight: regular;
`;

export default Container;
