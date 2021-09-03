import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import SearchBox from "../components/common/SearchBox";
import Filter from "../components/common/Filter";
import CardGrid from "../components/common/CardGrid";

export default function AllCountries({ countries, loading }) {
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

	useEffect(() => {
		if (countries.length < 1) return;
		setCountriesToDisplay([...countries]);
	}, [countries]);

	useEffect(() => {
		if (countries.length < 1) return;
		if (query === "") return;

		setRegion("All");
		let filteredCountries = [...countries];
		filteredCountries = countries.filter((country) => {
			const regex = new RegExp(query, "i");
			return regex.test(country.name);
		});
		setCountriesToDisplay(filteredCountries);
	}, [countries, query]);

	useEffect(() => {
		if (countries.length < 1) return;
		if (region === "All") return;

		setQuery("");
		let filteredCountries = [...countries];
		filteredCountries = countries.filter((country) => {
			return country.region === region;
		});
		setCountriesToDisplay(filteredCountries);
	}, [countries, region]);

	return (
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
			<CardGrid loading={loading} items={countriesToDisplay} />
		</React.Fragment>
	);
}
