import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getThemeStatus } from "./services/themeService";
import Header from "./components/Header.jsx";
import AllCountries from "./pages/AllCountries";
import "./assets/styles/style.scss";
import "./assets/styles/style-desktop.scss";
import "./assets/styles/fonts.scss";
import Country from "./pages/Country";

export default function App() {
	const [darkTheme, setDarkTheme] = useState(getThemeStatus() == "true" ? true : false);

	useEffect(() => {
		if (darkTheme) {
			document.documentElement.classList.add("dark-theme");
		} else {
			document.documentElement.classList.remove("dark-theme");
		}
	}, [darkTheme]);

	return (
		<Router>
			<Header
				darkTheme={darkTheme}
				toggleTheme={() => setDarkTheme((prevTheme) => !prevTheme)}
			/>
			<Switch>
				<Route path="/country/:id" component={Country} />
				<Route exact path="/" component={AllCountries} />
			</Switch>
			<ToastContainer />
		</Router>
	);
}
