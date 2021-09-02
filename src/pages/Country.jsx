import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import belgFlag from "../dummy-assets/belg-flag.jpg";

export default function Country() {
	return (
		<div className="country-page">
			<Link className="btn-link go-back-link" to="/">
				<IconContext.Provider value={{ className: "go-back-icon" }}>
					<IoIosArrowRoundBack />
				</IconContext.Provider>
				Back
			</Link>
			<main>
				<article className="country-article">
					<section className="country-article__media">
						<picture>
							<img src={belgFlag} alt="Belgium's flag" />
						</picture>
					</section>
					<section className="country-article__text">
						<h2>Belgium</h2>
						<dl className="desc-list">
							<div className="desc-list__item">
								<dt className="desc-list__item__term">Native Name:</dt>
								<dd className="desc-list__item__detail">
									{/*Number(population).toLocaleString()*/} Belgie
								</dd>
							</div>
							<div className="desc-list__item">
								<dt className="desc-list__item__term">Population:</dt>
								<dd className="desc-list__item__detail">
									{/* {Number(population).toLocaleString()} */}
									11,319,511
								</dd>
							</div>
							<div className="desc-list__item">
								<dt className="desc-list__item__term">Region:</dt>
								<dd className="desc-list__item__detail">{/*region*/}Europe</dd>
							</div>
							<div className="desc-list__item">
								<dt className="desc-list__item__term">Sub Region:</dt>
								<dd className="desc-list__item__detail">{/*capital*/}Western Europe</dd>
							</div>
							<div className="desc-list__item">
								<dt className="desc-list__item__term">Capital:</dt>
								<dd className="desc-list__item__detail">{/*capital*/}Brussels</dd>
							</div>
						</dl>
						<dl className="desc-list">
							<div className="desc-list__item">
								<dt className="desc-list__item__term">Top Level Domain:</dt>
								<dd className="desc-list__item__detail">
									{/*Number(population).toLocaleString()*/}.be
								</dd>
							</div>
							<div className="desc-list__item">
								<dt className="desc-list__item__term">Currencies:</dt>
								<dd className="desc-list__item__detail">
									{/* {Number(population).toLocaleString()} */}
									Euro
								</dd>
							</div>
							<div className="desc-list__item">
								<dt className="desc-list__item__term">Languages:</dt>
								<dd className="desc-list__item__detail">
									{/*region*/}Duth, French, German
								</dd>
							</div>
						</dl>
						<h3>Border Countries:</h3>
						<Link className="btn-link" to="#">
							France
						</Link>
						<Link className="btn-link" to="#">
							Germany
						</Link>
						<Link className="btn-link" to="#">
							Netherlands
						</Link>
					</section>
				</article>
			</main>
		</div>
	);
}
