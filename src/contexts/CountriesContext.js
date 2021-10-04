import React, { createContext, useState, useEffect } from "react";
import { getCountries } from "../services/countriesService";

const CountriesContext = createContext();

export function CountriesProvider({ children }) {
	const [countries, setCountries] = useState([]);
	const [regions, setRegions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const setData = async () => {
			try {
				setLoading(true);
				const { data } = await getCountries();
				setCountries(data);
				const extractedRegion = getRegions(data);
				setRegions(extractedRegion);
			} catch (ex) {
				setError("Sorry, something went wrong, please try refreshing the page later");
			}
			setLoading(false);
		};
		setData();
	}, []);

	const getRegions = (countries) => {
		const regionsSet = new Set();

		countries.forEach((country) => {
			regionsSet.add(country.region);
		});

		const regionsArray = Array.from(regionsSet);
		regionsArray.unshift("All");
		return regionsArray;
	};

	const providerValue = {
		countries,
		regions,
		loading,
		error,
	};

	return (
		<CountriesContext.Provider value={providerValue}>
			{children}
		</CountriesContext.Provider>
	);
}

export default CountriesContext;
