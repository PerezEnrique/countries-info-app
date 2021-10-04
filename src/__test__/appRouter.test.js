import React from "react";
import { screen, render, within, fireEvent } from "@testing-library/react";
import AppRouter from "../AppRouter";
import CountriesCountext from "../contexts/CountriesContext";
import countriesMock, { getRegions } from "../__mocks__/countriesMock.js";

describe("When user goes to '/'", () => {
	it("it must mount 'All Countries' page", () => {
		window.history.pushState({}, "", `/`);
		render(
			<CountriesCountext.Provider
				value={{
					countries: countriesMock,
					regions: getRegions(),
					loading: false,
					error: "",
				}}
			>
				<AppRouter />
			</CountriesCountext.Provider>
		);

		expect(screen.getByRole("search")).toBeInTheDocument();
	});
});

describe("When user is on All countries components and clicks on one of the links to country's details", () => {
	it("it must redirects user to Country page", () => {
		window.history.pushState({}, "", `/`);
		render(
			<CountriesCountext.Provider
				value={{
					countries: countriesMock,
					regions: getRegions(),
					loading: false,
					error: "",
				}}
			>
				<AppRouter />
			</CountriesCountext.Provider>
		);

		const card = screen.getAllByRole("article")[0];
		const testingCountry = countriesMock[0];
		const countrysNameOnCard = within(card).getByRole("heading", {
			name: testingCountry.name.common,
		});
		const anchorOnHeading = countrysNameOnCard.children[0];

		fireEvent.click(anchorOnHeading);

		const articles = screen.getAllByRole("article");
		const countrysDetailsHeading = within(articles[0]).getByRole("heading", {
			name: testingCountry.name.common,
		});

		//We expect the back link present on Country page
		expect(screen.getByRole("link", { name: /back/i })).toHaveAttribute("href", "/");
		//We expect only one article in this page
		expect(articles.length).not.toBeGreaterThan(1);
		//if that article is showing the name of the requested country it means we are on Country page
		expect(countrysDetailsHeading).toBeInTheDocument();
		//finally for more security we can check the searchbox absence
		expect(screen.queryByRole("search")).not.toBeInTheDocument();
	});
});

describe("When user goes to '/country/:code'", () => {
	it("it must mount Country page", () => {
		const testingCountry = countriesMock[0];
		const { name, cca3 } = testingCountry;
		window.history.pushState({}, "", `/country/${cca3}`);
		render(
			<CountriesCountext.Provider
				value={{
					countries: countriesMock,
					regions: getRegions(),
					loading: false,
					error: "",
				}}
			>
				<AppRouter />
			</CountriesCountext.Provider>
		);

		const articles = screen.getAllByRole("article");
		const countrysName = within(articles[0]).getByRole("heading", {
			name: name.common,
		});

		expect(screen.getByRole("link", { name: /back/i })).toHaveAttribute("href", "/");
		expect(articles.length).not.toBeGreaterThan(1);
		expect(countrysName).toBeInTheDocument();
	});
});
