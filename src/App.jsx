import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCountries } from "./services/countriesService";
import { getThemeStatus } from "./services/themeService";
import Header from "./components/Header.jsx";
import AllCountries from "./pages/AllCountries";
import Country from "./pages/Country";
import "./assets/styles/style.scss";
import "./assets/styles/style-desktop.scss";
import "./assets/styles/fonts.scss";

export default function App() {
	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [darkTheme, setDarkTheme] = useState(getThemeStatus() == "true" ? true : false);

	useEffect(() => {
		const setData = async () => {
			try {
				setLoading(true);
				const { data } = await getCountries();
				setCountries(data);
			} catch (ex) {
				setError("Sorry, something went wrong, please try refreshing the page later");
			}
			setLoading(false);
		};
		setData();
	}, []);

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
				<Route
					path="/country/:code"
					render={(props) => (
						<Country {...props} countries={countries} loading={loading} error={error} />
					)}
				/>
				<Route
					exact
					path="/"
					render={(props) => (
						<AllCountries
							{...props}
							countries={countries}
							loading={loading}
							error={error}
						/>
					)}
				/>
			</Switch>
		</Router>
	);
}
