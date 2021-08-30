import React from "react";
import { IconContext } from "react-icons";
import { IoMdSearch } from "react-icons/io";

export default function SearchBox({ query, handleQuery, placeholder }) {
	return (
		<IconContext.Provider value={{ className: "search-box__icon" }}>
			<div className="search-box" role="search">
				<IoMdSearch />
				<input
					className="search-box__input"
					type="search"
					value={query}
					onChange={(e) => handleQuery(e.target.value)}
					placeholder={placeholder}
				/>
			</div>
		</IconContext.Provider>
	);
}
