import http from "./httpService";
import config from "../config.json";

const apiUrl = process.env.NODE_ENV === "test" ? "" : config.apiUrl;

export function getCountries() {
	return http.get(`${apiUrl}/all`);
}
