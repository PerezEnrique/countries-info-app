import React from "react";

function CountryCard({ country: { flag, name, population, region, capital } }) {
	return (
		<article className="card">
			<section className="card__head">
				<picture className="card__head__img">
					<img src={flag} alt={`${name}'s flag`} />
				</picture>
			</section>
			<section className="card__body">
				<div className="card__body__text">
					<h2>{name}</h2>
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
