import { useState, useEffect, useContext } from "react";
import CountriesContext from "../contexts/CountriesContext";

export default function useFilters() {
	const { countries } = useContext(CountriesContext);
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
		//if user cleaned the field we need to set filteredCountries to all Countries
		//but if the field was cleaned by user selecting an option, other than all, in select by region filter, then we must return.
		if (query === "" && region !== "All") return;

		setRegion("All"); //set filter by region to "all", to avoid user's confusion
		let filteredCountries = [...countries];
		filteredCountries = countries.filter((country) => {
			const regex = new RegExp(query, "i");
			return regex.test(country.name.common);
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

	return {
		countriesToDisplay,
		setCountriesToDisplay,
		query,
		setQuery,
		region,
		setRegion,
	};
}
