import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";

describe("<Header/>", () => {
	const logo = /countries info$/i;

	it("must render the logo", () => {
		render(<Header />);
		expect(screen.getByText(logo)).toBeInTheDocument(); //toBeInTheDocument() is from @testing-library/jest-dom, imported in setupTests.js
	});
});
