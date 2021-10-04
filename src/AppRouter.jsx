import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllCountries from "./pages/AllCountries";
import Country from "./pages/Country";

export default function AppRouter() {
	return (
		<Router>
			<Switch>
				<Route path="/country/:code" component={Country} />
				<Route exact path="/" component={AllCountries} />
			</Switch>
		</Router>
	);
}
