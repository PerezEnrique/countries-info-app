import http from "./httpService";
import config from "../config.json";

const apiUrl = process.env.NODE_ENV === "test" ? "" : config.apiUrl;
const accessKey = process.env.REACT_APP_API_ACCESS_KEY;

export function getCountries() {
	return http.get(`${apiUrl}/all?access_key=${accessKey}`);
}
