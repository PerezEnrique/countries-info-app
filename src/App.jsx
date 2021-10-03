import React, { useState, useEffect } from "react";
import { CountriesProvider } from "./contexts/CountriesContext";
import { getThemeStatus } from "./services/themeService";
import "./assets/styles/style.scss";
import "./assets/styles/style-desktop.scss";
import "./assets/styles/fonts.scss";
import AppRouter from "./AppRouter";
import Header from "./components/Header.jsx";

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
		<CountriesProvider>
			<Header
				darkTheme={darkTheme}
				toggleTheme={() => setDarkTheme((prevTheme) => !prevTheme)}
			/>
			<AppRouter />
		</CountriesProvider>
	);
}
