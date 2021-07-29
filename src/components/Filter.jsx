import React from "react";
import { useState } from "react";
import { IconContext } from "react-icons";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

export default function Filter() {
	const [showOptions, setShowOptions] = useState(false);
	return (
		<IconContext.Provider value={{ className: "filter__dropdown__icon" }}>
			<div className="filter">
				<button className="filter__dropdown" onClick={() => setShowOptions(!showOptions)}>
					Filter by region
					{!showOptions ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
				</button>
				<ul
					className={
						!showOptions
							? "filter__dropdown__box"
							: "filter__dropdown__box filter__dropdown__box--active"
					}
				>
					<li className="filter__dropdown__box__option" data-value="">
						All
					</li>
					<li className="filter__dropdown__box__option" data-value="africa">
						Africa
					</li>
					<li className="filter__dropdown__box__option" data-value="america">
						America
					</li>
					<li className="filter__dropdown__box__option" data-value="asia">
						Asia
					</li>
					<li className="filter__dropdown__box__option" data-value="europe">
						Europe
					</li>
					<li className="filter__dropdown__box__option" data-value="oceania">
						Oceania
					</li>
				</ul>
			</div>
		</IconContext.Provider>
	);
}
