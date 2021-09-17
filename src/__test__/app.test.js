import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, render, within, waitFor } from "@testing-library/react";
import App from "../App.jsx";
import countriesMock from "../__mocks__/countriesMock.js";

const server = setupServer(
	rest.get("/all", (req, res, ctx) => res(ctx.status(200), ctx.json(countriesMock)))
);

beforeAll(() => server.listen());

beforeEach(() => render(<App />));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("When app is mounted", () => {
	it("must render the header with app logo and a theme switcher button", () => {
		const header = screen.getByRole("banner");
		expect(header).toBeInTheDocument();
		expect(within(header).getByText(/countries info$/i)).toBeInTheDocument();
		expect(
			within(header).getByRole("button", { name: /Dark mode/i })
		).toBeInTheDocument();
	});

	it("must fetch the data and display it on one of the app pages. ", async () => {
		const loader = screen.getByRole("status");
		expect(loader).toBeInTheDocument();
		await waitFor(() => {
			expect(loader).not.toBeInTheDocument();
			expect(screen.getByRole("main")).toBeInTheDocument();
		});
	});
});

describe("When app is mounted but the fetch request is not successful", () => {
	it("must display the error message: 'Sorry, something went wrong, please try refreshing the page later'", async () => {
		server.use(rest.get("/all", (req, res, ctx) => res(ctx.status(500))));

		render(<App />);

		await waitFor(() => {
			expect(
				screen.getByText(
					/Sorry, something went wrong, please try refreshing the page later/i
				)
			).toBeInTheDocument();
		});
	});
});
