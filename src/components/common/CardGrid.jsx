import React from "react";
import CountryCard from "../CountryCard";
import Loader from "./Loader.jsx";

export default function CardGrid({ loading, items, noItemMessage }) {
	return (
		<main className="card-grid">
			{loading ? (
				<Loader />
			) : items.length < 1 ? (
				<h2 className="card-grid__no-item-message">{noItemMessage}</h2>
			) : (
				items.map((item) => <CountryCard key={Number(item.ccn3)} country={item} />)
			)}
		</main>
	);
}
