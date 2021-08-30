import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IconContext } from "react-icons";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

export default function Filter({ items, selectedItem, handleSelection, criterion }) {
	const [showOptions, setShowOptions] = useState(false);

	const handleClick = (e) => {
		handleSelection(e.target.dataset.value);
		setShowOptions(false);
	};

	return (
		<IconContext.Provider value={{ className: "filter__dropdown__icon" }}>
			<div className="filter">
				<button
					className="filter__dropdown"
					id="filter-dropdown"
					onClick={() => setShowOptions(!showOptions)}
					aria-expanded={!showOptions ? "false" : "true"}
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
				>
					{items.map((item) => (
						<li
							key={uuidv4()}
							className="filter__dropdown__box__option"
							data-value={item}
							onClick={handleClick}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		</IconContext.Provider>
	);
}
