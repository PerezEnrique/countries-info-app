import React from "react";
import CountryCard from "../CountryCard";
import Loader from "../Loader.jsx";

export default function CardGrid({ loading, items }) {
	return (
		<main className="card-grid">
			{loading ? (
				<Loader />
			) : items.length < 1 ? (
				<Loader />
			) : (
				items.map((item) => <CountryCard key={Number(item.numericCode)} country={item} />)
			)}
		</main>
	);
}
