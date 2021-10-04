import React from "react";
import useTheme from "./hooks/useTheme";
import { CountriesProvider } from "./contexts/CountriesContext";
import "./assets/styles/style.scss";
import "./assets/styles/style-desktop.scss";
import "./assets/styles/fonts.scss";
import AppRouter from "./AppRouter";
import Header from "./components/Header.jsx";

export default function App() {
	const [darkTheme, setDarkTheme] = useTheme("dark-theme", "dark-theme");

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
