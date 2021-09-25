import React, { createContext, useState, useEffect } from "react";
import { getCountries } from "../services/countriesService";

const CountriesContext = createContext();

export function CountriesProvider({ children }) {
	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const setData = async () => {
			try {
				setLoading(true);
				const { data } = await getCountries();
				setCountries(data);
			} catch (ex) {
				setError("Sorry, something went wrong, please try refreshing the page later");
			}
			setLoading(false);
		};
		setData();
	}, []);

	const providerValue = {
		countries,
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
