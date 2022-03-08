import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AllCountries from "./pages/AllCountries";
import Country from "./pages/Country";
import NotFound from "./pages/NotFound";

export default function AppRouter() {
	return (
		<Router>
			<Switch>
				<Route path="/country/:code" component={Country} />
				<Route path="/not-found" component={NotFound} />
				<Route exact path="/" component={AllCountries} />
				<Redirect to="/not-found" />
			</Switch>
		</Router>
	);
}
