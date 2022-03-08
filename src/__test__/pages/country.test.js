import React from "react";
import { screen, render, within } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CountriesCountext from "../../contexts/CountriesContext";
import Country from "../../pages/Country";
import countriesMock, { getCountriesByName, getSingleCountry } from "../../__mocks__/countriesMock";

const testingCountry = getCountriesByName("thailand")[0];

beforeEach(() => {
	window.history.pushState({}, "", `/country/${testingCountry.cca3}`);
	render(
		<CountriesCountext.Provider
			value={{ countries: countriesMock, loading: false, error: "", getSingleCountry: getSingleCountry }}
		>
			<Router>
				<Route path="/country/:code" component={Country} />
			</Router>
		</CountriesCountext.Provider>
	);
});

describe("when page is mounted", () => {
	it("must display country's flag and country's name (as a heading) on article", () => {
		const { name, flags } = testingCountry;
		const article = screen.getByRole("article");
		const countrysName = within(article).getByRole("heading", {
			name: name.common,
		});
		const countrysFlag = within(article).getByRole("img", {
			name: `${name.common}'s flag`,
		});

		expect(article).toBeInTheDocument();
		expect(countrysName).toBeInTheDocument();
		expect(countrysFlag).toBeInTheDocument();
		expect(countrysFlag).toHaveAttribute("src", flags[0]);
	});

	it(`must have the following terms in the description list: official name, region, sub region, capital, top level domain, 
    currencies, languages`, () => {
		const article = screen.getByRole("article");
		expect(within(article).getByText(/official name/i)).toBeInTheDocument();
		expect(within(article).getByText(/^region/i)).toBeInTheDocument();
		expect(within(article).getByText(/sub region/i)).toBeInTheDocument();
		expect(within(article).getByText(/capital/i)).toBeInTheDocument();
		expect(within(article).getByText(/top level domain/i)).toBeInTheDocument();
		expect(within(article).getByText(/currencies/i)).toBeInTheDocument();
		expect(within(article).getByText(/languages/i)).toBeInTheDocument();
	});

	it(`must display, on article, official name, region, sub region, capital, top level domain, 
    currencies, languages, as definitions`, () => {
		const { name, region, subregion, capital, tld, currencies, languages } =
			testingCountry;
		const article = screen.getByRole("article");
		const definitions = within(article).getAllByRole("definition");
		const currenciesArray = Object.keys(currencies);
		const languagesArray = Object.keys(languages);

		const testingCurrencies = currenciesArray.map((item, index) => {
			if (index !== currenciesArray.length - 1) {
				return `${currencies[item].name}, `;
			}
			return currencies[item].name;
		});

		const testingLanguages = languagesArray.map((item, index) => {
			if (index !== languagesArray.length - 1) {
				return `${languages[item]}, `;
			}
			return languages[item];
		});

		expect(definitions[0]).toHaveTextContent(name.official);
		expect(definitions[1]).toHaveTextContent(region);
		expect(definitions[2]).toHaveTextContent(subregion);
		expect(definitions[3]).toHaveTextContent(capital);
		expect(definitions[4]).toHaveTextContent(tld.join(" "));
		expect(definitions[5]).toHaveTextContent(testingCurrencies);
		expect(definitions[6]).toHaveTextContent(testingLanguages);
	});

	it("must display country's border countries with a link on article", () => {
		const article = screen.getByRole("article");
		const links = within(article).getAllByRole("link");
		expect(links).toHaveLength(testingCountry.borders.length);
	});
});
