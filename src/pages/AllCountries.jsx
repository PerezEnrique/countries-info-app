import React, { useContext, useState, useEffect } from "react";
import CountriesContext from "../contexts/CountriesContext";
import { IconContext } from "react-icons";
import SearchBox from "../components/common/SearchBox";
import Filter from "../components/common/Filter";
import CardGrid from "../components/common/CardGrid";

export default function AllCountries() {
	const { countries, loading, error } = useContext(CountriesContext);

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

	//set countries to display when countries prop changes
	useEffect(() => {
		if (countries.length < 1) return;
		setCountriesToDisplay([...countries]);
	}, [countries]);

	//filter by query when query hook state changes
	useEffect(() => {
		if (countries.length < 1) return;
		if (query === "") return;

		setRegion("All"); //set filter by region to "all", to avoid user's confusion
		let filteredCountries = [...countries];
		filteredCountries = countries.filter((country) => {
			const regex = new RegExp(query, "i");
			return regex.test(country.name);
		});
		setCountriesToDisplay(filteredCountries);
	}, [countries, query]);

	//filter by region
	useEffect(() => {
		if (countries.length < 1) return;

		//when filter is set to "all"... T
		//his is specially important for cases when user re-sets filter to "all" after having filtered by something else before
		if (region === "All") {
			let filteredCountries = [...countries];
			setCountriesToDisplay(filteredCountries);
			return;
		}

		setQuery(""); //cleans the query field, to avoid user's confusion
		let filteredCountries = [...countries];
		filteredCountries = countries.filter((country) => {
			return country.region === region;
		});
		setCountriesToDisplay(filteredCountries);
	}, [countries, region]);

	return error ? (
		<p className="error-message">{error}</p>
	) : (
		<React.Fragment>
			<section className="filters-section">
				<IconContext.Provider value={{ className: "search-box__icon" }}>
					<SearchBox
						query={query}
						handleQuery={setQuery}
						placeholder="Search for a country..."
					/>
				</IconContext.Provider>
				<IconContext.Provider value={{ className: "filter__dropdown__icon" }}>
					<Filter
						items={regions}
						selectedItem={region}
						handleSelection={setRegion}
						criterion="region"
					/>
				</IconContext.Provider>
			</section>
			<CardGrid
				loading={loading}
				items={countriesToDisplay}
				noItemMessage={"Sorry, your search did not match any country :("}
			/>
		</React.Fragment>
	);
}
