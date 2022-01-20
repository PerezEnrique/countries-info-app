import React from "react";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

export default function Filter({ items, selectedItem, handleSelection, criterion }) {
	const [showOptions, setShowOptions] = useState(false);
	const filter = useRef();
	const filterDropdown = useRef();
	const itemToFocus = useRef();

	const handleClick = (e) => {
		handleSelection(e.target.id);
		setShowOptions(false);
	};

	const handleKeyDown = (e) => {
		const buttonHasFocus = e.target.tagName === "BUTTON";
		const optionHasFocus = e.target.getAttribute("role") === "option";

		if (buttonHasFocus) {
			//When focus is on button
			switch (e.code) {
				case "ArrowDown":
				case "ArrowUp":
					//if user press arrow down or arrow up, it opens the listbox
					setShowOptions(true);
					break;
				default:
					break;
			}
		} else if (optionHasFocus) {
			//When focus is on an item
			switch (e.code) {
				case "ArrowDown":
					// if user press arrow down, it moves focus to and selects the next option.
					if (!e.target.nextElementSibling) return;
					e.preventDefault(); //to prevent scrolling
					e.target.nextElementSibling.focus();
					break;
				case "ArrowUp":
					// if user press arrow up, it moves focus to and selects the previous option.
					if (!e.target.previousElementSibling) return;
					e.preventDefault();
					e.target.previousElementSibling.focus();
					break;
				case "Enter":
					//If user press enter, it collapses the listbox and keeps the currently selected option as the button label.
					setShowOptions(false);
					handleSelection(e.target.id);
					break;
				case "Escape":
					//If user press esc, it collapses the listbox and moves focus to the button.
					setShowOptions(false);
					filterDropdown.current.focus();
					break;
				default:
					break;
			}
		}
	};

	//We need to verify if the clicks event happened inside the filter component, those clicks shouldn't collapse our listbox
	const handleClickOutside = (e) => {
		//JavaScript doesn't consider that the dropwdown button icon is nested inside the filter.
		//So the next step of this method will prevent that those clicks expand the dropdown when it's collapsed
		//To avoid that will check if click happended on that icon.
		const clickOcurredOnDropdownIcon = e.target.closest(".filter__dropdown__icon"); //if truty, the click happened on icon
		if (clickOcurredOnDropdownIcon) return;

		if (!filter.current.contains(e.target)) setShowOptions(false);
	};

	useEffect(() => {
		if (!showOptions) return;
		// when listbox expands focus should be placed on the currently selected option in the list.
		itemToFocus.current.focus();
	}, [showOptions, itemToFocus]);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);


	return (
		<div className="filter" ref={filter}>
			<button
				className="filter__dropdown"
				id="filter-dropdown"
				ref={filterDropdown}
				onClick={() => setShowOptions(!showOptions)}
				onKeyDown={handleKeyDown}
				aria-haspopup="listbox"
				aria-expanded={!showOptions ? undefined : "true"} //passing undefined here is the same as not including it at all. This way we can create something closer to Collapsible Dropdown Listbox Example by W3.org
			>
				{selectedItem === "All" ? `Filter by ${criterion}` : selectedItem}
				{!showOptions ? (
					<RiArrowDropDownLine aria-hidden="true" />
				) : (
					<RiArrowDropUpLine aria-hidden="true" />
				)}
			</button>
			<ul
				className={
					!showOptions
						? "filter__dropdown__box"
						: "filter__dropdown__box filter__dropdown__box--active"
				}
				aria-labelledby="filter-dropdown"
				role="listbox"
				aria-activedescendant={selectedItem}
			>
				{items.map((item) => (
					<li
						key={uuidv4()}
						ref={item !== selectedItem ? undefined : itemToFocus}
						id={item}
						className="filter__dropdown__box__option"
						onClick={handleClick}
						onKeyDown={handleKeyDown}
						role="option"
						tabIndex="-1" //This means its not focusable through sequential keyboard navigation, but it can still be programatically focused
						aria-selected={item !== selectedItem ? "false" : "true"}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
