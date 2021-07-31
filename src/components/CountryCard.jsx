import React from "react";
import belgFlag from "../dummy-assets/belg-flag.jpg";

function CountryCard() {
	return (
		<article className="card">
			<section className="card__head">
				<picture className="card__head__img">
					<img src={belgFlag} alt="belgium flag" />
				</picture>
			</section>
			<section className="card__body">
				<div className="card__body__text">
					<h2>Belgium</h2>
					<dl className="desc-list">
						<div className="desc-list__item">
							<dt className="desc-list__item__term">Population:</dt>
							<dd className="desc-list__item__detail">11.319.511</dd>
						</div>
						<div className="desc-list__item">
							<dt className="desc-list__item__term">Region:</dt>
							<dd className="desc-list__item__detail">Europe</dd>
						</div>
						<div className="desc-list__item">
							<dt className="desc-list__item__term">Capital:</dt>
							<dd className="desc-list__item__detail">Burssels</dd>
						</div>
					</dl>
				</div>
			</section>
		</article>
	);
}

export default CountryCard;
