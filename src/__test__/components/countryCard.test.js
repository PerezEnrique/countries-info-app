import React from "react";
import { render, screen } from "@testing-library/react";
import CountryCard from "../../components/CountryCard";

describe("<CountryCard/>", () => {
	it("must render a heading (to display country's name)", () => {
		render(<CountryCard />);
		expect(screen.getByRole("heading")).toBeInTheDocument();
	});

	it("must have the term 'population' within the description list", () => {
		render(<CountryCard />);
		expect(screen.getByText(/population:/i)).toBeInTheDocument();
	});

	it("must have the term 'region' within the description list", () => {
		render(<CountryCard />);
		expect(screen.getByText(/region:/i)).toBeInTheDocument();
	});

	it("must have the term 'capital' within the description list", () => {
		render(<CountryCard />);
		expect(screen.getByText(/capital:/i)).toBeInTheDocument();
	});
});
