import React from "react";
import "./assets/styles/style.scss";
import "./assets/styles/fonts.scss";
import Header from "./components/Header.jsx";
import SearchBox from "./components/SearchBox.jsx";
import Filter from "./components/Filter";
import CardGrid from "./components/CardGrid";

export default function App() {
	return (
		<React.Fragment>
			<Header />
			<SearchBox />
			<Filter />
			<CardGrid />
		</React.Fragment>
	);
}
