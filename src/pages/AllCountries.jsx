import React, { useContext, useEffect, useState } from "react";
import CountriesContext from "../contexts/CountriesContext";
import { IconContext } from "react-icons";
import SearchBox from "../components/common/SearchBox";
import Listbox from "../components/common/Listbox";
import CardGrid from "../components/common/CardGrid";
import Loader from "../components/common/Loader";

export default function AllCountries() {
	const { countries, regions, loading, error } = useContext(CountriesContext);
	const [query, setQuery] = useState("");
	const [selectedRegion, setSelectedRegion] = useState("All");
	const [countriesToDisplay, setCountriesToDisplay] = useState([]);

	const handleQuery = (value) => {
		setSelectedRegion("All");
		setQuery(value);
	}
	
	const handleRegionSelection = (region) => {
		setQuery("");
		setSelectedRegion(region);
	}

	useEffect(() => {
		let filteredCountries = [...countries];
		console.log("gen")
		if(query){
			console.log("query")
			filteredCountries = countries.filter((country) => {
				const regex = new RegExp(query, "i");
				return regex.test(country.name.common);
			});
		}else if(selectedRegion !== "All"){
			console.log("select")
			filteredCountries = countries.filter((country) => {
				return country.region === selectedRegion;
			});
		}

		setCountriesToDisplay(filteredCountries);
	}, [countries, query, selectedRegion])

	return error ? (
		<p className="error-message">{error}</p>
	) : loading ? (
		<Loader />
	) : (
		<main>
			<section className="filters-section">
				<IconContext.Provider value={{ className: "search-box__icon" }}>
					<SearchBox
						query={query}
						handleQuery={handleQuery}
						placeholder="Search for a country..."
					/>
				</IconContext.Provider>
				<IconContext.Provider value={{ className: "filter__dropdown__icon" }}>
					<Listbox
						items={regions}
						selectedItem={selectedRegion}
						handleSelection={handleRegionSelection}
						criterion="region"
					/>
				</IconContext.Provider>
			</section>
			<CardGrid
				items={countriesToDisplay}
				noItemMessage={"Sorry, your search did not match any country :("}
			/>
		</main>
	);
}
