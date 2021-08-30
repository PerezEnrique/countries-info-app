const themeKey = "dark-theme";

export function getThemeStatus() {
	return localStorage.getItem(themeKey);
}

export function setThemeStatus(status) {
	localStorage.setItem(themeKey, status);
}
