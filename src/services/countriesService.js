import http from "./httpService";
import config from "../config.json";

export function getCountries() {
	return http.get(`${config.apiUrl}/all`);
}
