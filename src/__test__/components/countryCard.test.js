import React from "react";
import { render, screen } from "@testing-library/react";
import CountryCard from "../../components/CountryCard";
import countryMock from "../../__mocks__/countryMock";

describe("<CountryCard/>", () => {
	beforeEach(() =>
		render(<CountryCard key={Number(countryMock.numericCode)} country={countryMock} />)
	);

	it("must render a heading (to display country's name)", () => {
		expect(screen.getByRole("heading")).toBeInTheDocument();
	});

	it("must have the term 'population' on the description list", () => {
		expect(screen.getByText(/population:/i)).toBeInTheDocument();
	});

	it("must have the term 'region' on the description list", () => {
		expect(screen.getByText(/region:/i)).toBeInTheDocument();
	});

	it("must have the term 'capital' on the description list", () => {
		expect(screen.getByText(/capital:/i)).toBeInTheDocument();
	});
});
