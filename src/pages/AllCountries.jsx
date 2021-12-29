import React, { useContext, useState } from "react";
import CountriesContext from "../contexts/CountriesContext";
import Filters from "../components/Filters";
import CardGrid from "../components/common/CardGrid";
import Loader from "../components/common/Loader";

export default function AllCountries() {
	const { loading, error } = useContext(CountriesContext);
	const [countriesToDisplay, setCountriesToDisplay] = useState([]);

	return error ? (
		<p className="error-message">{error}</p>
	) : loading ? (
		<Loader />
	) : (
		<main>
			<Filters setCountriesToDisplay={setCountriesToDisplay} />
			<CardGrid
				items={countriesToDisplay}
				noItemMessage={"Sorry, your search did not match any country :("}
			/>
		</main>
	);
}
