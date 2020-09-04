import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Roller = styled.div`
	display: inline-block;
	width: auto;
	height: 4em;
	width: 4em;
	box-sizing: border-box;
	&:after {
		box-sizing: border-box;
		content: " ";
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 0.6em solid var(--color-primary);
		border-color: var(--color-primary) transparent var(--color-primary)
			transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	${(props) => css`
		${props.verySmall &&
		css`
			height: 1rem;
			width: 1em;
			&:after {
				border-width: 0.2em;
			}
		`}
		${props.small &&
		css`
			height: 2rem;
			width: 2em;
			&:after {
				border-width: 0.4em;
			}
		`}
    ${props.big &&
		css`
			height: 6rem;
			width: 6em;
			&:after {
				border-width: 0.8em;
			}
		`}
    
    ${props.veryBig &&
		css`
        height: 8rem;
        width: 8em;
        &:after {
          border-width: 1em;
      `}
	`}
`;

const Loader = ({ className, verySmall, small, big, veryBig }) => {
	return (
		<Roller
			className={`loader ${className}`}
			verySmall={verySmall}
			small={small}
			big={big}
			veryBig={veryBig}
		/>
	);
};

Loader.propTypes = {
	className: PropTypes.string,
	verySmall: PropTypes.bool,
	small: PropTypes.bool,
	big: PropTypes.bool,
	veryBig: PropTypes.bool,
};

Loader.defaultProps = {
	className: "",
	verySmall: false,
	small: false,
	big: false,
	veryBig: false,
};

export default Loader;
