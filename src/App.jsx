import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCountries } from "./services/countriesService";
import { getThemeStatus } from "./services/themeService";
import Header from "./components/Header.jsx";
import SearchBox from "./components/common/SearchBox.jsx";
import Filter from "./components/common/Filter";
import CardGrid from "./components/common/CardGrid";
import "./assets/styles/style.scss";
import "./assets/styles/style-desktop.scss";
import "./assets/styles/fonts.scss";

export default function App() {
	const [countries, setCountries] = useState([]);
	const [regions, setRegions] = useState([
		"All",
		"Africa",
		"Americas",
		"Asia",
		"Europe",
		"Oceania",
	]);
	const [countriesToDisplay, setCountriesToDisplay] = useState([]);
	const [query, setQuery] = useState("");
	const [region, setRegion] = useState("All");
	const [loading, setLoading] = useState(false);

	const [darkTheme, setDarkTheme] = useState(getThemeStatus() == "true" ? true : false);

	useEffect(() => {
		const setData = async () => {
			setLoading(true);
			const { data } = await getCountries();
			setCountries(data);
			setCountriesToDisplay(data);
			setLoading(false);
		};
		setData();
	}, []);

	useEffect(() => {
		if (countries.length < 0) return;
		let filteredCountries = [...countries];

		if (query !== "") {
			filteredCountries = countries.filter((country) => {
				const regex = new RegExp(query, "i");
				return regex.test(country.name);
			});
		}

		if (region !== "All") {
			filteredCountries = countries.filter((country) => {
				return country.region === region;
			});
		}

		setCountriesToDisplay(filteredCountries);
	}, [query, region]);

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
			<ToastContainer />
			<section className="filters-section">
				<SearchBox
					query={query}
					handleQuery={setQuery}
					placeholder="Search for a country..."
				/>
				<Filter
					items={regions}
					selectedItem={region}
					handleSelection={setRegion}
					criterion="region"
				/>
			</section>
			<CardGrid loading={loading} items={countriesToDisplay} />
		</Router>
	);
}
