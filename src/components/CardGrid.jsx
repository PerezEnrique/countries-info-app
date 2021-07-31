import React from "react";
import CountryCard from "./CountryCard";

export default function CardGrid() {
	return (
		<main className="card-grid">
			<CountryCard />
			<CountryCard />
			<CountryCard />
			<CountryCard />
		</main>
	);
}
