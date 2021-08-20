import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../App";
import countryMock from "../__mocks__/countryMock";

const server = setupServer(
	rest.get("https://restcountries.eu/rest/v2/all", (req, res, ctx) => {
		return res(ctx.json(countryMock));
	})
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("<App/>", () => {
	beforeEach(() => render(<App />));

	it("must render an article element after fetching countries data", async () => {
		await waitFor(() => expect(screen.getByRole("article")).toBeInTheDocument());
	});
});
