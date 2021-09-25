import React, { useContext, useState, useEffect } from "react";
import CountriesContext from "../contexts/CountriesContext";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loader from "../components/common/Loader";
import { v4 as uuidv4 } from "uuid";

export default function Country({ match }) {
	const { countries, loading, error } = useContext(CountriesContext);

	const [country, setCountry] = useState({
		flag: "",
		name: "",
		nativeName: "",
		population: "",
		region: "",
		subregion: "",
		capital: "",
		topLevelDomain: [],
		currencies: [],
		languages: [],
		borders: [],
	});

	//Find country will be used to get the country's data and to get the name of each border country
	const findCountry = (code) => {
		return countries.find((element) => element.alpha3Code === code.toUpperCase());
	};

	useEffect(() => {
		if (countries.length < 1) return;
		setCountry(findCountry(match.params.code));
	}, [countries, match.params.code]);

	const {
		flag,
		name,
		nativeName,
		population,
		region,
		subregion,
		capital,
		topLevelDomain,
		currencies,
		languages,
		borders,
	} = country;

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
								<img src={flag} alt={`${name}'s flag`} />
							</picture>
						</section>
						<section className="country-article__text">
							<h2>{name}</h2>
							<section className="country-article__text__desc-lists">
								<dl className="desc-list">
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Native Name:</dt>
										<dd className="desc-list__item__detail">{nativeName}</dd>
									</div>
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Population:</dt>
										<dd className="desc-list__item__detail">
											{Number(population).toLocaleString()}
										</dd>
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
										<dd className="desc-list__item__detail">
											{topLevelDomain.join(" ")}
										</dd>
									</div>
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Currencies:</dt>
										<dd className="desc-list__item__detail">
											{currencies.map((currencie, index) =>
												index !== currencies.length - 1
													? `${currencie.name},`
													: currencie.name
											)}
										</dd>
									</div>
									<div className="desc-list__item">
										<dt className="desc-list__item__term">Languages:</dt>
										<dd className="desc-list__item__detail">
											{languages.map((language, index) =>
												index !== languages.length - 1
													? `${language.name},`
													: language.name
											)}
										</dd>
									</div>
								</dl>
							</section>
							<section className="country-article__text__border-countries">
								<h3>Border Countries:</h3>
								{borders.length < 1 ? (
									<span>No border countries</span>
								) : (
									borders.map((border) => (
										<Link key={uuidv4()} className="btn-link" to={`/country/${border}`}>
											{findCountry(border).name}
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
