import React, { lazy, Suspense } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import AppContainer from "core/components/UIcomponents/AppContainer";
import ThemeProvider from "core/styles/ThemeProvider";

import { ROUTES } from "./router/routes";
import Loader from "core/components/loader/Loader";

const Cities = lazy(() => import("features/cities/Cities"));

const AppRouter = () => (
	<Suspense fallback={<Loader />}>
		<Switch>
			<Route path={ROUTES.CITIES} component={Cities} />
			<Redirect to={ROUTES.CITIES} />
		</Switch>
	</Suspense>
);

const App = (props) => {
	return (
		<Router>
			<ThemeProvider>
				<AppContainer>
					<main>
						<AppRouter />
					</main>
				</AppContainer>
			</ThemeProvider>
		</Router>
	);
};

export default App;
