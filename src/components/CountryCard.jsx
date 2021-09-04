import React from "react";
import { Link } from "react-router-dom";

function CountryCard({
	country: { flag, name, population, region, capital, alpha3Code },
}) {
	return (
		<article className="card">
			<section className="card__head">
				<Link to={`/country/${alpha3Code}`}>
					<picture className="card__head__img">
						<img src={flag} alt={`${name}'s flag image`} />
					</picture>
				</Link>
			</section>
			<section className="card__body">
				<div className="card__body__text">
					<h2>
						<Link className="heading-link" to={`/country/${alpha3Code}`}>
							{name}
						</Link>
					</h2>
					<dl className="desc-list">
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
							<dt className="desc-list__item__term">Capital:</dt>
							<dd className="desc-list__item__detail">{capital}</dd>
						</div>
					</dl>
				</div>
			</section>
		</article>
	);
}

export default CountryCard;
