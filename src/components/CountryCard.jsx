import React from "react";
import { Link } from "react-router-dom";

function CountryCard({
	country: { flags, name, region, subregion, capital, cca3: alpha3code },
}) {
	return (
		<article className="card">
			<section className="card__head">
				<Link to={`/country/${alpha3code}`}>
					<picture className="card__head__img">
						<img loading="lazy" src={flags[0]} alt={`${name.common}'s flag`} />
					</picture>
				</Link>
			</section>
			<section className="card__body">
				<div className="card__body__text">
					<h2>
						<Link className="heading-link" to={`/country/${alpha3code}`}>
							{name.common}
						</Link>
					</h2>
					<dl className="desc-list">
						<div className="desc-list__item">
							<dt className="desc-list__item__term">Region:</dt>
							<dd className="desc-list__item__detail">{region}</dd>
						</div>
						<div className="desc-list__item">
							<dt className="desc-list__item__term">Sub region:</dt>
							<dd className="desc-list__item__detail">{subregion}</dd>
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
