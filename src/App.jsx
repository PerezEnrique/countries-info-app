import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/styles/style.scss";
import "./assets/styles/fonts.scss";
import Header from "./components/Header.jsx";
import SearchBox from "./components/SearchBox.jsx";
import Filter from "./components/Filter";
import CardGrid from "./components/CardGrid";
import http from "./services/httpServices";
import { ToastContainer } from "react-toastify";

export default function App() {
	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(false);

	const [darkTheme, setDarkTheme] = useState(
		localStorage.getItem("dark-theme") == "true" ? true : false
	);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const { data } = await http.get("https://restcountries.eu/rest/v2/all");
			setCountries(data);
			setLoading(false);
		};
		fetchProducts();
	}, []);

	useEffect(() => {
		localStorage.setItem("dark-theme", darkTheme);
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
			<ToastContainer />
			<SearchBox />
			<Filter />
			<CardGrid loading={loading} countries={countries} />
		</Router>
	);
}
