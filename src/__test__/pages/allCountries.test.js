import React from "react";
import { screen, render, within, fireEvent } from "@testing-library/react";
import AllCountries from "../../pages/AllCountries";
import { BrowserRouter as Router } from "react-router-dom";
import CountriesCountext from "../../contexts/CountriesContext";
import countriesMock, {
	getCountriesByName,
	getCountriesByRegion,
} from "../../__mocks__/countriesMock";

beforeEach(() =>
	render(
		<Router>
			<CountriesCountext.Provider
				value={{ countries: countriesMock, loading: false, error: "" }}
			>
				<AllCountries />
			</CountriesCountext.Provider>
		</Router>
	)
);

describe("When page is mounted", () => {
	it("must display a searchbox", () => {
		expect(screen.getByRole("search")).toBeInTheDocument();
		expect(screen.getByRole("searchbox")).toBeInTheDocument();
	});

	it("must display a filter by region select with options: All, Africa, Americas, Asia, Europe and Oceania", () => {
		const listbox = screen.getByRole("listbox");
		const options = within(listbox).getAllByRole("option");
		expect(listbox).toBeInTheDocument();
		expect(options[0]).toHaveTextContent(/All$/i);
		expect(options[1]).toHaveTextContent(/Africa$/i);
		expect(options[2]).toHaveTextContent(/Americas$/i);
		expect(options[3]).toHaveTextContent(/Asia$/i);
		expect(options[4]).toHaveTextContent(/Europe$/i);
		expect(options[5]).toHaveTextContent(/Oceania$/i);
	});

	it("must display all data items on Country Card components. Each one of these cards must have article role", () => {
		const cards = screen.getAllByRole("article");
		expect(cards).toHaveLength(countriesMock.length);
	});

	it(`must display country's flag and country's name (as a heading) on card component, 
	both must also have a link to country's page`, () => {
		const card = screen.getAllByRole("article")[0];
		const testingCountry = countriesMock[0];
		const { name, flags, cca3 } = testingCountry;
		const linkToCountry = `/country/${cca3}`;
		const countrysName = within(card).getByRole("heading", {
			name: name.common,
		});
		const countrysFlag = within(card).getByRole("img", {
			name: `${name.common}'s flag`,
		});

		expect(countrysName).toBeInTheDocument();
		expect(countrysName.children[0]).toHaveAttribute("href", linkToCountry);
		expect(countrysFlag).toBeInTheDocument();
		expect(countrysFlag).toHaveAttribute("src", flags[0]);
		expect(countrysFlag.closest("a")).toHaveAttribute("href", linkToCountry);
	});

	it("must have the following terms in the description list: region, sub region, capital", () => {
		const card = screen.getAllByRole("article")[0];
		expect(within(card).getByText(/^region/i)).toBeInTheDocument();
		expect(within(card).getByText(/sub region/i)).toBeInTheDocument();
		expect(within(card).getByText(/capital/i)).toBeInTheDocument();
		//Ideally we should have get all "term" roles and check their text content (as we do in the following test)
		//but due to a bug getByRole does not work with term
	});

	it(`must display, in card component, region, subregion and capital, as definitions`, () => {
		const card = screen.getAllByRole("article")[0];
		const testingCountry = countriesMock[0];
		const { region, subregion, capital } = testingCountry;
		const definitions = within(card).getAllByRole("definition");

		expect(definitions[0]).toHaveTextContent(region);
		expect(definitions[1]).toHaveTextContent(subregion);
		expect(definitions[2]).toHaveTextContent(capital);
	});
});

describe("When the user performs a query", () => {
	it("must reset the select filter to all", () => {
		//click on africa
		fireEvent.click(screen.getAllByRole("option")[1]);

		//button must have value africa
		expect(screen.getByRole("button", { name: /africa/i })).toBeInTheDocument();

		//type something on searchbox
		fireEvent.change(screen.getByRole("searchbox"), { target: { value: "a" } });

		//button should change its name to Filter by region which means select has been reset to "All"
		expect(screen.queryByRole("button", { name: /africa/i })).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Filter by region/i })).toBeInTheDocument();
	});
});

describe("When user performs a query without results", () => {
	it("must display the following message: Sorry, your search did not match any country", () => {
		//we cannot store query in a constant here, since getAllByRole returns an array not an element
		//which means, if we later used the constant it will reference the array and not the query
		expect(screen.getAllByRole("article")).toHaveLength(countriesMock.length);

		fireEvent.change(screen.getByRole("searchbox"), {
			target: { value: "this will not match any testing country" },
		});

		expect(screen.queryAllByRole("article")).toHaveLength(0);
		expect(
			screen.getByText(/Sorry, your search did not match any country/i)
		).toBeInTheDocument();
	});
});

describe("When user performs a query with results", () => {
	it("must display matched coutries", () => {
		const searchInput = screen.getByRole("searchbox");
		const testQuery = "thailand";
		const expectedCountry = getCountriesByName(testQuery)[0];

		//type something that match one of the testing countries
		fireEvent.change(searchInput, { target: { value: testQuery } });

		//matching country must be present as a card component
		const cards = screen.queryAllByRole("article");
		expect(cards.length).toBeGreaterThan(0);
		expect(
			within(cards[0]).getByRole("heading", { name: expectedCountry.name.common })
		).toBeInTheDocument();
	});
});

describe("When user selects a region to filter by", () => {
	it("must clean the searchbox field", () => {
		const searchInput = screen.getByRole("searchbox");

		//type something
		fireEvent.change(searchInput, { target: { value: "a" } });

		//searchbox must correctly display the typed query
		expect(searchInput).toHaveValue("a");

		//select africa region
		fireEvent.click(screen.getAllByRole("option")[1]);

		//searchbox must be clean
		expect(searchInput).toHaveValue("");
	});

	it("must display only the countries in that region", () => {
		const options = screen.getAllByRole("option");
		const testOption = options[1];
		const expectedCountry = getCountriesByRegion(testOption.textContent)[0];
		const notExpectedCountry = getCountriesByRegion(options[2].textContent)[0];

		//click on africa
		fireEvent.click(testOption);

		//matching country must be present as a card component
		const cards = screen.queryAllByRole("article");
		expect(cards.length).toBeGreaterThan(0);
		expect(
			within(cards[0]).getByRole("heading", { name: expectedCountry.name.common })
		).toBeInTheDocument();

		//not matching countries must not be present
		expect(
			within(cards[0]).queryByRole("heading", { name: notExpectedCountry.name.common })
		).not.toBeInTheDocument();
	});

	it("must display all countries if user resets select to 'All'", () => {
		//click on africa
		fireEvent.click(screen.getAllByRole("option")[1]);
		expect(screen.queryAllByRole("article")).not.toHaveLength(countriesMock.length);

		//click on All
		fireEvent.click(screen.getAllByRole("option")[0]);
		expect(screen.queryAllByRole("article")).toHaveLength(countriesMock.length);
	});
});
