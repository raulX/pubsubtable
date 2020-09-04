import React from "react";
import { TextField } from "@material-ui/core";

const Input = (props) => {
	const { error = null, ...other } = props;
	return (
		<TextField
			variant="outlined"
			{...other}
			{...(error && { error: true, helperText: error })}
		/>
	);
};

export default Input;
