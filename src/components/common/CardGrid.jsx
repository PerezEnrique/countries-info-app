import React from "react";
import CountryCard from "../CountryCard";

export default function CardGrid({ items, noItemMessage }) {
	return (
		<main className="card-grid">
			{items.length < 1 ? (
				<h2 className="card-grid__no-item-message">{noItemMessage}</h2>
			) : (
				items.map((item) => <CountryCard key={Number(item.ccn3)} country={item} />)
			)}
		</main>
	);
}
