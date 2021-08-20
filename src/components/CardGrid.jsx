import React from "react";
import CountryCard from "./CountryCard";
import Loader from "./Loader.jsx";

export default function CardGrid({ loading, countries }) {
	return (
		<main className="card-grid">
			{loading ? (
				<Loader />
			) : countries.length < 1 ? (
				<Loader />
			) : (
				countries.map((country) => (
					<CountryCard key={Number(country.numericCode)} country={country} />
				))
			)}
		</main>
	);
}
