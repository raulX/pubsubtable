import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const Button = (props) => {
	const { text, size, color, variant, onClick, type, to, ...other } = props;

	if (to) {
		return (
			<MuiButton
				startIcon={props.startIcon}
				variant={variant || "contained"}
				size={size || "large"}
				component={Link}
				color={color || "primary"}
				to={to}
			>
				{text}
			</MuiButton>
		);
	}

	return (
		<MuiButton
			{...other}
			type={type || "button"}
			variant={variant || "contained"}
			size={size || "large"}
			color={color || "primary"}
			onClick={onClick}
		>
			{text}
		</MuiButton>
	);
};

export default Button;
