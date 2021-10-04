import React, { useContext, useEffect } from "react";
import useFilters from "../hooks/useFilters";
import CountriesContext from "../contexts/CountriesContext";
import { IconContext } from "react-icons";
import SearchBox from "../components/common/SearchBox";
import Listbox from "../components/common/Listbox";
import CardGrid from "../components/common/CardGrid";
import Loader from "../components/common/Loader";

export default function AllCountries() {
	const { loading, error } = useContext(CountriesContext);
	const { countriesToDisplay, query, setQuery, region, setRegion } = useFilters();

	const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

	return error ? (
		<p className="error-message">{error}</p>
	) : loading ? (
		<Loader />
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
					<Listbox
						items={regions}
						selectedItem={region}
						handleSelection={setRegion}
						criterion="region"
					/>
				</IconContext.Provider>
			</section>
			<CardGrid
				items={countriesToDisplay}
				noItemMessage={"Sorry, your search did not match any country :("}
			/>
		</React.Fragment>
	);
}
