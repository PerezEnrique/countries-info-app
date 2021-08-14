import React from "react";
import { IconContext } from "react-icons";
import { IoMoonOutline, IoMoonSharp } from "react-icons/io5";

export default function Header({ darkTheme, toggleTheme }) {
	return (
		<IconContext.Provider value={{ className: "header__btn__icon" }}>
			<header className="header">
				<h1>Countries info</h1>
				<button className="header__btn" onClick={toggleTheme}>
					{!darkTheme ? <IoMoonOutline /> : <IoMoonSharp />}
					Dark mode
				</button>
			</header>
		</IconContext.Provider>
	);
}
