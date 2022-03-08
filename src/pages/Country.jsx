import React, { useContext, useState, useEffect } from "react";
import CountriesContext from "../contexts/CountriesContext";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loader from "../components/common/Loader";
import { v4 as uuidv4 } from "uuid";

export default function Country({ match }) {
	const { countries, loading, error, getSingleCountry } = useContext(CountriesContext);

	const [country, setCountry] = useState({
		flags: [],
		name: {},
		region: "",
		subregion: "",
		capital: "",
		tld: [],
		currencies: {},
		languages: {},
		borders: [],
	});

	useEffect(() => {
		if (countries.length < 1) return;
		const singleCountry = getSingleCountry(match.params.code);
		if(!singleCountry) return;

		setCountry(singleCountry);
	}, [countries, match.params.code]);

	const { flags, name, region, subregion, capital, currencies, languages, tld, borders } =
		country;

	const currenciesArray = Object.keys(currencies);
	const languagesArray = Object.keys(languages);

	return error ? (
		<p className="error-message">{error}</p>
	) : (
		<div className="country-page">
			<Link className="btn-link go-back-link" to="/">
				<IconContext.Provider value={{ className: "go-back-icon" }}>
					<IoIosArrowRoundBack />
				</IconContext.Provider>
				Back
			</Link>
			<main>
				{loading ? (
					<Loader />
				) : (
					<article className="country-article">
						<section className="country-article__media">
							<picture>
								<img src={flags[0]} alt={`${name.common}'s flag`} />
							</picture>
						</section>
						<section className="country-article__text">
							<h2 className="main-heading">{name.common}</h2>
							<section className="country-article__text__desc-lists">
								<dl className="desc-list">
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Official Name:</dt>
										<dd className="desc-list__item__detail">{name.official}</dd>
									</div>
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Region:</dt>
										<dd className="desc-list__item__detail">{region}</dd>
									</div>
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Sub Region:</dt>
										<dd className="desc-list__item__detail">{subregion}</dd>
									</div>
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Capital:</dt>
										<dd className="desc-list__item__detail">{capital}</dd>
									</div>
								</dl>
								<dl className="desc-list">
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Top Level Domain:</dt>
										<dd className="desc-list__item__detail">{tld.join(" ")}</dd>
									</div>
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Currencies:</dt>
										<dd className="desc-list__item__detail">
											{currenciesArray.map((item, index) =>
												index !== currenciesArray.length - 1
													? `${currencies[item].name}, `
													: currencies[item].name
											)}
										</dd>
									</div>
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Languages:</dt>
										<dd className="desc-list__item__detail">
											{languagesArray.map((item, index) =>
												index !== languagesArray.length - 1
													? `${languages[item]}, `
													: languages[item]
											)}
										</dd>
									</div>
								</dl>
							</section>
							<section className="country-article__text__border-countries">
								<h3>Border Countries:</h3>
								{!borders || borders.length < 1 ? (
									<span>No border countries</span>
								) : (
									borders.map((border) => (
										<Link key={uuidv4()} className="btn-link" to={`/country/${border}`}>
											{getSingleCountry(border).name.common}
										</Link>
									))
								)}
							</section>
						</section>
					</article>
				)}
			</main>
		</div>
	);
}
