import React from "react";
import { IoMdSearch } from "react-icons/io";

export default function SearchBox({ query, handleQuery, placeholder }) {
	return (
		<div className="search-box" role="search">
			<IoMdSearch aria-hidden="true" />
			<input
				className="search-box__input"
				type="search"
				value={query}
				onChange={(e) => handleQuery(e.target.value)}
				placeholder={placeholder}
			/>
		</div>
	);
}
