import React from "react";
import CountryCard from "../CountryCard";
import { v4 as uuidv4 } from "uuid";

export default function CardGrid({ items, noItemMessage }) {
	return (
		<section className="card-grid">
			{!items || items.length < 1 ? (
				<h2 className="card-grid__no-item-message">{noItemMessage}</h2>
			) : (
				items.map((item) => <CountryCard key={uuidv4()} country={item} />)
			)}
		</section>
	);
}
