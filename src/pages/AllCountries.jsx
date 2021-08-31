import React, { useState, useEffect } from "react";
import SearchBox from "../components/common/SearchBox";
import Filter from "../components/common/Filter";
import CardGrid from "../components/common/CardGrid";
import { getCountries } from "../services/countriesService";

export default function AllCountries() {
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

	return (
		<React.Fragment>
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
		</React.Fragment>
	);
}
