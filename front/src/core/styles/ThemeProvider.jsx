import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { blue, orange, grey } from "@material-ui/core/colors";

import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

const appliedTheme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: orange,
		background: {
			paper: grey[200],
			default: grey[400],
		},
	},
});

const ThemeProvider = ({ children }) => {
	return (
		<StyledComponentsThemeProvider theme={appliedTheme}>
			{children}
		</StyledComponentsThemeProvider>
	);
};

export default ThemeProvider;
