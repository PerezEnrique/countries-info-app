import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

export default function Filter({ items, selectedItem, handleSelection, criterion }) {
	const [showOptions, setShowOptions] = useState(false);

	const handleClick = (e) => {
		handleSelection(e.target.id);
		setShowOptions(false);
	};

	return (
		<div className="filter">
			<button
				className="filter__dropdown"
				id="filter-dropdown"
				onClick={() => setShowOptions(!showOptions)}
				aria-haspopup="listbox"
				aria-expanded={!showOptions ? undefined : "true"} //passing undefined here is the same as not including it at all. This way we can create something closer to Collapsible Dropdown Listbox Example by W3.org
			>
				{selectedItem === "All" ? `Filter by ${criterion}` : selectedItem}
				{!showOptions ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
			</button>
			<ul
				className={
					!showOptions
						? "filter__dropdown__box"
						: "filter__dropdown__box filter__dropdown__box--active"
				}
				aria-labelledby="filter-dropdown"
				role="listbox"
				tabIndex="-1" //Makes the listbox focusable.
				aria-activedescendant={selectedItem === "All" ? undefined : selectedItem}
			>
				{items.map((item) => (
					<li
						key={uuidv4()}
						id={item}
						className="filter__dropdown__box__option"
						onClick={handleClick}
						role="option"
						aria-selected={item !== selectedItem ? "false" : "true"}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
